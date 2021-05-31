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


