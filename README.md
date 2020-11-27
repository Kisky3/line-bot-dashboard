# Takaku Bot
## Project setup
amplify cli インストール
https://docs.amplify.aws/cli/start/install

前提条件：　nodeの10.x以上、npmの6.x以上をインストールしておく必要があります。

https://nodejs.org/en/download/
https://www.npmjs.com/get-npm

```
npm install -g @aws-amplify/cli
```

## 開発環境用のリソースをsetupする
```
$ git clone https://github.com/marketenterprise/takaku-bot.git
$ cd takaku-bot
$ git fetch
$ yarn install
$ amplify pull --appId d291pyjz0zpcpd --envName dev
```

amplifyのリソースを扱う設定を対話式で行う
Scanning for plugins... Plugin scan successful

For more information on AWS Profiles, see: https://docs.aws.amazon.com/cli/latest/userguide/cli-multiple-profiles.html

? Do you want to use an AWS profile? 'Yes'

? Please choose the profile you want to use 'takakubot' <- 個々のAWSプロファイル

Amplify AppID found: d2b9jk8l2p5g7m. Amplify App name is: takakubot

Backend environment dev found in Amplify Console app: takakubot

? Choose your default editor: Visual Studio Code <- お好みで

? Choose the type of app that you're building javascript

Please tell us about your project

? What javascript framework are you using vue

? Source Directory Path: src

? Distribution Directory Path: dist

? Build Command: npm run-script build

? Start Command: npm run-script serve

? Do you plan on modifying this backend? No

Added backend environment config object to your project.

Run 'amplify pull' to sync upstream changes.

## 個々のAWSプロファイルについて
~/.aws/config に以下のような記載が必要です。

（詳細はインフラ畑まで）

```
[profile takakubot]
role_arn=arn:aws:iam::69908xxxx706:role/AdministratorRole
source_profile=default
region=ap-northeast-1
```

## Compiles and hot-reloads for development
```
yarn serve
```

## Compiles and minifies for production
```
yarn build
```

## Lints and fixes files
```
yarn lint
```

## Customize configuration
See Configuration Reference.

## テストユーザー情報



## リリースまで対応すべきチケット：
```
バックエンド:
LineDevelopでユーザーアカウント作成 (藤崎、田代)
権限付きのAPIGetway、Role、Bucket、Lambdaの枠の作成 (田代、藤崎)
アカウントに友達追加する時に「こんにちは、写真を送ってください」旨のメッセージをユーザーに自動送信(webhook)
ユーザーは画像以外を送ってくれる場合、「「写真以外を送信しないてください」と返信する仕組みを作成(WebhookとLambda)
ユーザー送ってくれた画像とユーザーidをWebhookとLambdaを通じで、LinebotRequestsテーブルに保存できるまで
データー保存成功する時点で「査定中、何日以内返信する」の旨をユーザーに自動送信する
「買取不明」(unknown)をfrontから受け取った時に、ユーザーに「買取不明」に返信用LambdaとWebhookを作成
「買取不可」(notAvailable)をfrontから受け取った時に、ユーザーに「買取不可」に返信用LambdaとWebhookを作成
「高く売れるドットコムフォーム送信」(sendTakaku)をfrontから受け取った時に、ユーザーに「高くフォーム送信」に返信用LambdaとWebhookを作成
「おいくらフォーム送信」(sendOikura)をfrontから受け取った時に、ユーザーに「おいくらフォーム送信」に返信用LambdaとWebhookを作成
amplifyで生成したcloudfrontにipアドレス制限を追加する、社外のipアドレスをblockする


フロントエンド:
Vue Projectを作成とAmplifyのInit (向)
Ampliyのスキーマ設定、apiデプロイ、テーブル生成、一覧ざっくり表示できるように (向)
ログイン画面とユーザー権限(向)
一覧画面レイアウトの調整 (画像表示とテーブル化) (向)
「買取不明…四つのボタンを追加と、クリック時点でテーブルのstatusを変更する (graphql) =>検知処理は必要 (向)
「買取不明…四つのボタンを押す時点で、lambdaに該当する引数を渡す  (backend No.6,7,8,9 ) (向)
四つのボタンのどっちか押された時点で、依頼ステータスをチェックするValidationを実装する(向)
Validationが通った場合、DBの該当依頼のステータスを更新して、一覧status変更した時点で動的に表示できるよう(向)
画像をクリックすると大きくなるのモデルを作成する(向)
送信済みの場合ボタンは押せないように制御する(向)
Dashboard画面全体デザインの設計(向)
返信済みのものは1週間以上に経つと非表示にする
送信済みの依頼に操作者情報をDashboardに表示する (schema修正と送信する時点でDBにデータ保存)


そのほか：
ユーザー友達追加する時の　挨拶の文言作成 
写真を送ってください(最大3枚)　の旨の文言作成 
ユーザー写真を受け取った時点で「査定中、何日以内返信する」の旨の文言作成
「買取不明」の場合、文言作成 
「買取不可」の場合、文言作成
「高くフォーム送信」文言作成 
「おいくらフォーム送信」文言作成 

高く売れるフォームに「linebot」のパラメータを追加する
V2のタイトルとシステムテキストで「linebot」の赤字が表示する
```

