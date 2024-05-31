const express = require("express");
const app = express();

const expressPort = process.env.EXPRESS_PORT || 50113;

const ngrok = require("@ngrok/ngrok");
require("dotenv").config();

const ngrokPort = process.env.NGROK_PORT;

ngrok
  .connect({
    addr: ngrokPort, // 외부와 연결 해줄 내부 포트번호
    authtoken: process.env.NGROK_AUTHTOKEN, // ngrok에 가입 후 부여받은 토큰
    domain: process.env.NGROK_DOMAIN, // ngrok에 가입 후 부여받은 정적 도메인
    basic_auth: process.env.NGROK_BASIC_AUTH, // 도메인 접근 시 기본 인증을 위한 계정:비밀번호
    // verify_webhook_provider: "slack",   //웹훅을 사용하는 경우 해당 프로바이더를 지정
    // verify_webhook_secret: process.env.SLACK_SIGNING_SECRET, //웹훅을 사용하는 경우 해당 시크릿 기재
  })
  .then((listener) =>
    console.log(`Ingress established at: ${ngrokPort} + ${listener.url()}`)
  );

app.listen(expressPort, () => {
  console.log(`Express Server is running on port ${expressPort}`);
});
