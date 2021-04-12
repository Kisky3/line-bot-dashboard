const https = require("https");
const AWS = require("aws-sdk");
AWS.config.region = "ap-northeast-1";
AWS.config.update({
  region: "ap-northeast-1"
});
const s3 = new AWS.S3({
  apiVersion: "2006-03-01"
});
const docClient = new AWS.DynamoDB.DocumentClient({
  apiVersion: "2012-08-10"
});
const line = require("@line/bot-sdk");
const client = new line.Client({
  channelAccessToken: process.env.ACCESSTOKEN
});
const endpoint = process.env.ENDPOINT;
let rString = randomString();

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
// sessionが存在しないときに新規作成
function saveSession(userId, rString) {
  const item = {
    id: userId,
    session: userId + rString,
    images: []
  };
  const params = {
    TableName: "LinebotUserSession",
    Item: item
  };
  docClient.put(params, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      console.log("saveSession");
      console.log(data);
    }
  });
}

// sessionをkeyとして既存のユーザーsessionデータを取得する
async function getSessionData(userId) {
  const params = {
    TableName: "LinebotUserSession",
    Key: {
      id: userId
    }
  };
  return await docClient
    .get(params, function(err, data) {
      if (err) {
        // エラーの場合、コンソールにエラー情報を表示
        console.log(err, err.stack);
      } else {
        // 取得できた場合、データをコンソールに表示
        console.log("getSessionData");
        console.log(data);
      }
    })
    .promise();
}
// 新規依頼を保存する
async function saveRequest(userId, string) {
  const item = {
    id: userId + string,
    images: [],
    LineID: userId,
    LineUserName: userId,
    UserName: "",
    Status: 0,
    repliedAt: "2021-01-30T12:40:21.268166+09:00",
    updatedAt: "2021-01-30T12:40:21.268166+09:00",
    createdAt: "2021-01-30T12:40:21.268166+09:00"
  };
  const params = {
    TableName: "LineBotRequest-ivsefmvknncc5owyhe5jbzjw7m-dev",
    Item: item
  };
  await docClient.put(params, function(err, data) {
    if (err) {
      console.log("saveRequest error");
      console.log(err);
    } else {
      console.log("saveRequest");
      console.log(data);
    }
  });
}
// sessionとuserIDとして既存のデータを取得する
async function getRequestData(userId, session) {
  const params = {
    TableName: "LineBotRequest-ivsefmvknncc5owyhe5jbzjw7m-dev",
    Key: {
      id: session
    }
  };
  return await docClient
    .get(params, function(err, data) {
      if (err) {
        // エラーの場合、コンソールにエラー情報を表示
        console.log(err, err.stack);
      } else {
        // 取得できた場合、データをコンソールに表示
        console.log("getRequestData");
        console.log(data);
      }
    })
    .promise();
}
// 送信された同じ品物の画像を配列としてDBに保存する
function updateImage(userId, session, images) {
  const params = {
    TableName: "LineBotRequest-ivsefmvknncc5owyhe5jbzjw7m-dev",
    Key: {
      id: session
    },
    ExpressionAttributeNames: {
      "#images": "images"
    },
    ExpressionAttributeValues: {
      ":images": images
    },
    UpdateExpression: "SET #images = :images"
  };
  docClient.update(params, function(err, data) {
    if (err) {
      console.log("dddddddddddddddddd");
      console.log(err);
    } else {
      console.log("update succeed");
      console.log(data);
    }
  });
}
// LINEのユーザーにtextのメッセージを返信する
function sendMessage(text, replayToken, context) {
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
// LINEのユーザーにダイアログの確認メッセージを送信する
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
// LINEから来たレスポンス
exports.handler = (event, context) => {
  let body = JSON.parse(event.body);
  const userId = body.events[0].source.userId;
  const message = body.events[0].message;
  const replayToken = body.events[0].replyToken;
  //新ユーザーかどうかをチェックする
  getSessionData(userId).then(res => {
    console.log("getSessionData(userId).then(res => {");
    console.log(res);
    if (JSON.stringify(res) === "{}" || res === undefined) {
      saveSession(userId, rString);
      saveRequest(userId, rString);
    } else {
      return;
    }
  });
  //リクエストを取得
  // いいえの場合:システムからメッセージ送信「○○様、ご利用ありがとうございました！それでは、お品物が買取可能かお調べさせて頂きますね。査定結果をお待ち下さい〜」
  if (message.type === "text" && message.text !== "いいえ") {
    if (message.text === "はい") {
      sendMessage("お品物の追加画像を送り下さい。", replayToken, context);
    } else if (message.text === "なし") {
      sendMessage("ご利用ありがとうございました！", replayToken, context);
    } else {
      //テキストが投稿された場合の処理はこちら
      sendMessage(
        "査定したいお品物があれば、画像を送信してください！(最大3枚まで)",
        replayToken,
        context
      );
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
    const req = https.request(send_options, function(res) {
      const data = [];
      res
        .on("data", function(chunk) {
          data.push(new Buffer(chunk));
        })
        .on("error", function(err) {
          console.log(err);
          sendMessage("画像送信失敗しました！");
        })
        .on("end", function() {
          const params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: rString + ".jpg",
            Body: Buffer.concat(data)
          };
          s3.putObject(params, function(err, data) {
            // 画像保存後の処理 データの整形とDBに保存する
            getSessionData(userId).then(res => {
              if (res === undefined || res === {}) {
                saveSession(userId, rString);
                saveRequest(userId, rString);
              } else {
                getSessionData(userId).then(res => {
                  if (res !== undefined) {
                    const session = res.Item.session;
                    getRequestData(userId, session).then(res => {
                      const images = res.Item.images;
                      if (images.length === 3) {
                        sendMessage("画像最大3枚です！", replayToken);
                        saveSession(userId, rString);
                        saveRequest(userId, rString);
                        return;
                      }
                      images.push(endpoint + rString + ".jpg");
                      updateImage(userId, session, images);
                      confirmMessage(
                        "画像を受領しました！同じお品物の追加画像はございますでしょうか。",
                        "はい",
                        "いいえ",
                        replayToken
                      );
                    });
                  }
                });
              }
            });
          });
        });
    });
    req.end();
  }
};
