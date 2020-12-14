var https = require("https");
var AWS = require("aws-sdk");
AWS.config.region = "ap-northeast-1";
var s3 = new AWS.S3({ apiVersion: "2006-03-01" });
const line = require("@line/bot-sdk");
const client = new line.Client({ channelAccessToken: process.env.ACCESSTOKEN });

exports.handler = (event, context, callback) => {
  let body = JSON.parse(event.body);
  var message = body.events[0].message;
  //リクエストを取得
  if (message.type === "text") {
    //テキストが投稿された場合の処理はこちら
    const message = {
      type: "text",
      text: "商品の写真を送信してください。最大3枚まで"
    };
    client
      .replyMessage(body.events[0].replyToken, message)
      .then(response => {
        let lambdaResponse = {
          statusCode: 200,
          headers: { "X-Line-Status": "OK" },
          body: '{"result":"completed"}'
        };
        context.succeed(lambdaResponse);
      })
      .catch(err => console.log(err));
  }

  if (message.type === "image") {
    var message_id = message.id;
    // Request Headers
    var send_options = {
      host: "api.line.me",
      path: "/v2/bot/message/" + message_id + "/content",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: " Bearer " + process.env.ACCESSTOKEN
      },
      method: "GET"
    };
    // APIリクエスト
    var req = https.request(send_options, function(res) {
      var data = [];
      res
        .on("data", function(chunk) {
          //image data dividing it in to multiple request
          data.push(new Buffer(chunk));
        })
        .on("error", function(err) {
          console.log(err);
        })
        .on("end", function() {
          // ここに画像取得後の処理を書く
          // この場合は、引数で受け取った画像取得後の処理用callbackを実行
          // dataに画像のバイナリデータが入ってる
          console.log("ffffffffffffffffffffffffffffffffffff");
          console.log(data);
          console.log("ffffffffffffffffffffffffffffffffffff");
          //ファイル名として現在時刻を取得
          var nowDate = new Date();
          var nowTime = nowDate.getTime();

          var params = {
            Bucket: process.env.S3_BUCKET_NAME, // ←バケット名
            Key: body.events[0].source.userId + "/" + nowTime + ".jpg", // ←バケットに保存するファイル名
            Body: Buffer.concat(data)
          };
          s3.putObject(params, function(err, data) {
            // 画像保存後の処理
          });
        });
    });
    req.end();
  }
};
