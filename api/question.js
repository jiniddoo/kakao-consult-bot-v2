module.exports = (req, res) => {
  const params = (req.body && req.body.action && req.body.action.params) || {};

  const region = params.region || "미입력";
  const method = params.method || "미입력";
  const religion = params.religion || "미입력";
  const question = params.question || "미입력";

  const summary =
    `지역: ${region}\n` +
    `장법: ${method}\n` +
    `종교: ${religion}\n` +
    `질문: ${question}\n\n` +
    `잠시만 기다려주시면 상담사가 안내해드립니다.`;

  res.json({
    version: "2.0",
    template: {
      outputs: [
        { simpleText: { text: summary } }
      ]
    }
  });
};