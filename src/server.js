const express = require("express");
const cors = require("cors");
const axios = require("axios");
const path = require("path");
const app = express();
const port = 8080;

// CORS 미들웨어 설정
app.use(
  cors({
    origin: "http://localhost:3000", // React 애플리케이션의 출처를 허용합니다
  })
);

// 정적 파일 제공
app.use(express.static(path.join(__dirname, "public")));

// API 라우트 설정
app.get("/api/Gwangsan/getDustDataAPI", async (req, res) => {
  try {
    const response = await axios.get(
      "http://openapi.airgwangsan.kr:8080/Gwangsan/getDustDataAPI?apiId=01"
    );
    res.json(response.data);
  } catch (error) {
    console.error("API 요청 오류:", error.message); // 오류 메시지를 콘솔에 출력
    res.status(500).json({ error: "서버 오류 발생" });
  }
});

// 서버 시작
app.listen(port, () => {
  console.log(`서버가 포트 ${port}에서 실행 중입니다.`);
});
