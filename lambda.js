const https = require("https");
const AWS = require("aws-sdk");
AWS.config.region = "ap-northeast-1";
AWS.config.update({ region: "ap-northeast-1" });
const s3 = new AWS.S3({ apiVersion: "2006-03-01" });
const docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: "2012-08-10" });
const line = require("@line/bot-sdk");
const client = new line.Client({
  channelAccessToken: process.env.ACCESSTOKEN
});
const endpoint = process.env.END_POINT;

// 乱数sessionを生成する
let rString = randomString();

// Line側から来たresを受け取る
exports.handler = event => {
  let body = JSON.parse(event.body);
  const userId = body.events[0].source.userId;
  const message = body.events[0].message;
  const replayToken = body.events[0].replyToken;

  //リクエストを取得
  // いいえの場合:システムからメッセージ送信「○○様、ご利用ありがとうございました！それでは、お品物が買取可能かお調べさせて頂きますね。査定結果をお待ち下さい〜」
  if (message.type !== "image" && message.text !== "いいえ") {
    if (message.text === "はい") {
      sendMessage("お品物の追加画像を送り下さい。", replayToken);
    } else if (message.text === "なし") {
      sendMessage("ご利用ありがとうございました！", replayToken);
    } else {
      sendMessage(
        "査定したいお品物があれば、画像を送信してください！(最大3枚まで)",
        replayToken
      );
    }
  }
  if (message.type === "image") {
    const message_id = message.id;
    console.log("console.log(message_id);console.log(message_id);");
    console.log(message_id);

    const data = [];

    client.getMessageContent(message_id).then(stream => {
      stream.on("data", chunk => {
        data.push(new Buffer(chunk));
      });
      stream.on("error", err => {
        // error handling
      });
      stream.on("end", () => {
        let imagesSession = randomString();
        const params = {
          Bucket: process.env.S3_BUCKET_NAME,
          Key: rString + imagesSession + ".png",
          Body: Buffer.concat(data)
        };
        s3.putObject(params, function(err, data) {
          getSessionData(userId, rString).then(res => {
            if (Object.keys(res).length) {
              const images = res.Item.Images;
              if (Object.keys(images).length < 3) {
                images.push(endpoint + params.Key);
                updateImage(res.Item.id, images);
                if (Object.keys(images).length === 3) {
                  sendMessage(
                    "画像は最大3枚でございますので、ありがとうございました！",
                    replayToken
                  );
                  return;
                }
                confirmMessage(
                  "画像を受領しました！同じお品物の追加画像はございますでしょうか。",
                  "はい",
                  "いいえ",
                  replayToken
                );
              }
            } else {
              saveSession(params.Key, userId, rString);
              confirmMessage(
                "画像を受領しました！同じお品物の追加画像はございますでしょうか。",
                "はい",
                "いいえ",
                replayToken
              );
            }
          });
        });
      });
    });
  }
};

/* メソット：*/

// 乱数のsessionを生成する
function randomString() {
  const length = 32;
  const chars =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var result = "";
  for (var i = length; i > 0; --i)
    result += chars[Math.floor(Math.random() * chars.length)];
  return result;
}

// sessionを利用してデータを取ってくる
function getSessionData(userId, rString) {
  const params = {
    TableName: "LineBotRequest-ivsefmvknncc5owyhe5jbzjw7m-dev",
    Key: {
      id: userId + rString
    }
  };
  try {
    var Item = docClient
      .get(params, function(err, data) {
        if (err) {
          console.log("Error", err);
        } else {
          console.log("Success", data.Item);
        }
      })
      .promise();
    return Item;
  } catch (e) {
    return -1;
  }
}

// sessionを利用して画像リストを更新する
function updateImage(session, images) {
  const params = {
    TableName: "LineBotRequest-ivsefmvknncc5owyhe5jbzjw7m-dev",
    Key: {
      id: session
    },
    ExpressionAttributeNames: {
      "#Images": "Images"
    },
    ExpressionAttributeValues: {
      ":Images": images
    },
    UpdateExpression: "SET #Images = :Images"
  };
  docClient.update(params, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log("update succeed");
      console.log(data);
    }
  });
}

// sessionが存在しない場合はsessionと画像データを一緒にDBに保存する
function saveSession(imageKey, userId, rString) {
  var images = [];
  images.push(endpoint + imageKey);
  const item = {
    id: userId + rString,
    LineID: userId,
    Images: images,
    LineUserName: userId,
    UserName: "",
    Status: 0,
    updatedAt: "2021-04-30T12:40:21.268166+09:00",
    createdAt: "2021-04-30T12:40:21.268166+09:00",
    repliedAt: "2021-04-30T12:40:21.268166+09:00"
  };
  const params = {
    TableName: "LineBotRequest-ivsefmvknncc5owyhe5jbzjw7m-dev",
    Item: item
  };
  docClient.put(params, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  });
}

// テキストメッセージを送信する
function sendMessage(text, replayToken) {
  const message = {
    type: "text",
    text: text
  };
  client
    .replyMessage(replayToken, message)
    .then(response => {
      let lambdaResponse = {
        statusCode: 200,
        headers: {
          "X-Line-Status": "OK"
        },
        body: '{"result":"completed"}'
      };
      context.succeed(lambdaResponse);
    })
    .catch(err => console.log(err));
}

// 確認ダイアログを生成して送信する
function confirmMessage(text, label1, label2, replayToken) {
  return client.replyMessage(replayToken, {
    type: "template",
    altText: text,
    template: {
      type: "confirm",
      text: text,
      actions: [
        {
          type: "message",
          label: label1,
          text: label1
        },
        {
          type: "message",
          label: label2,
          text: label2
        }
      ]
    }
  });
}
