const ngrok = require("@ngrok/ngrok");
require("dotenv").config();

const port = process.env.PORT;

ngrok
  .connect({
    addr: port, // 외부와 연결 해줄 내부 포트번호
    authtoken: process.env.NGROK_AUTHTOKEN, // ngrok에 가입 후 부여받은 토큰
    domain: process.env.NGROK_DOMAIN, // ngrok에 가입 후 부여받은 정적 도메인
  })
  .then((listener) =>
    console.log(`Ingress established at: ${port} + ${listener.url()}`)
  );
