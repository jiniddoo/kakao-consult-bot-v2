const express = require("express");
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("OK kakao bot v2");
});

app.post("/api/consult", (req, res) => {
  res.json({
    version: "2.0",
    template: {
      outputs: [
        { simpleText: { text: "안녕하세요! 상담을 도와드릴게요." } }
      ]
    }
  });
});

module.exports = app;
