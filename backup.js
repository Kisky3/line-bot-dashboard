const https = require("https");
const AWS = require("aws-sdk");
AWS.config.region = "ap-northeast-1";
AWS.config.update({region: 'ap-northeast-1'});
const s3 = new AWS.S3({apiVersion: "2006-03-01"});
const docClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});
const line = require("@line/bot-sdk");
const client = new line.Client({
  channelAccessToken: process.env.ACCESSTOKEN
});
const endpoint = "https://takakuureru-bot-imgs.s3-ap-northeast-1.amazonaws.com/";
let rString = randomString();
// 乱数のsessionを生成する
function randomString() {
  const length = 32;
  const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var result = '';
  for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}
exports.handler = (event, context) => {
  let body = JSON.parse(event.body);
  const userId = body.events[0].source.userId;
  const message = body.events[0].message;
  console.log("body.message---------------------------");
  console.log(message);
  const replayToken = body.events[0].replyToken
  function getSessionData() {
    const params = {
      TableName: "LinebotUserSession",
      Key: {
        id: userId + rString
      }
    };
    try {
      console.log("console params---------")
      console.log(params)
      var Item = docClient.get(params, function(err, data) {
        if (err) {
          console.log("Error", err);
        } else {
          console.log("Success", data.Item);
        }
      }).promise();
      return Item;
    } catch (e) {
      return -1;
    }
  }
  function updateImage(session, images) {
    const params = {
      TableName: "LinebotUserSession",
      Key: {
        id: session,
      },
      ExpressionAttributeNames: {
        '#images': 'images',
      },
      ExpressionAttributeValues: {
        ':images': images
      },
      UpdateExpression: 'SET #images = :images'
    };
    docClient.update(params, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log("update succeed")
        console.log(data);
      }
    });
  }
  function saveSession(imageKey) {
    var images = [];
    images.push(imageKey);
    const item = {
      id: userId + rString,
      userId: userId,
      images: images
    };
    const params = {
      TableName: "LinebotUserSession",
      Item: item
    };
    docClient.put(params, function (err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      }
    });
  }
  function sendMessage(text) {
    const message = {
      type: "text",
      text: text
    };
    client.replyMessage(replayToken, message).then(response => {
      let lambdaResponse = {
        statusCode: 200,
        headers: {
          "X-Line-Status": "OK"
        },
        body: '{"result":"completed"}'
      };
      context.succeed(lambdaResponse);
    }).catch(err => console.log(err));
  }
  function confirmMessage(text, label1, label2) {
    return client.replyMessage(replayToken, {
      "type": "template",
      "altText": text,
      "template": {
        "type": "confirm",
        "text": text,
        "actions": [{
          "type": "message",
          "label": label1,
          "text": label1
        }, {
          "type": "message",
          "label": label2,
          "text": label2,
        }]
      }
    });
  }
  console.log("message--------------------");
  console.log(message);
  //リクエストを取得
  // いいえの場合:システムからメッセージ送信「○○様、ご利用ありがとうございました！それでは、お品物が買取可能かお調べさせて頂きますね。査定結果をお待ち下さい〜」
  if (message.type !== "image" && message.text !== "いいえ") {
    if (message.text === "はい") {
    sendMessage("お品物の追加画像を送り下さい。");
    }
    else if (message.text === "なし") {
      sendMessage("ご利用ありがとうございました！");
    }
    else {
      sendMessage("査定したいお品物があれば、画像を送信してください！(最大3枚まで)");
    }
  }
  if (message.type === "image") {
    const message_id = message.id;
    // Request Headers
    const send_options = {
      host: "api.line.me",
      path: "/v2/bot/message/" + message_id + "/content",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: " Bearer " + process.env.ACCESSTOKEN
      },
      method: "GET"
    };
    // APIリクエスト
    const req = https.request(send_options, function (res) {
      const data = [];
      res.on("data", function (chunk) {
        //image data dividing it in to multiple request
        data.push(new Buffer(chunk));
      }).on("error", function (err) {
        console.log(err);
        sendMessage("画像送信失敗しました！");
      }).on("end", function () {
        let imagesSession = randomString();
        console.log("data-----------------")
        console.log(data);
        const params = {
          Bucket: process.env.S3_BUCKET_NAME,
          Key: rString + imagesSession + ".jpg",
          Body: Buffer.concat(data)
        };
        console.log("params-------------------")
        console.log(params);
        s3.putObject(params, function (err, data) {
          // 画像保存後の処理 データの整形とDBに保存する
          getSessionData().then(res => {
            console.log("res---------")
            console.log(res);
            console.log("this rString-----")
            console.log(rString);
            console.log("Object.keys(res).length---------------------")
            console.log(Object.keys(res).length)
              if (Object.keys(res).length) {
                const images = res.Item.images
                if (Object.keys(images).length < 2) {
                  images.push(params.Key)
                  console.log("images------------------")
                  console.log(images);
                  updateImage(res.Item.id, images);
                  confirmMessage("画像を受領しました！同じお品物の追加画像はございますでしょうか。", "はい", "いいえ");
                } else {
                  sendMessage("画像は最大3枚でございますので、ありがとうございました！");
                }
              } else {
                saveSession(params.Key);
                confirmMessage("画像を受領しました！同じお品物の追加画像はございますでしょうか。", "はい", "いいえ");
              }
          });
        });
      });
    });
    req.end();
  }
};