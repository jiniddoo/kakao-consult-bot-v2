module.exports = (req, res) => {
  const { region, method, religion, question } = req.body.action.params || {};
  const summary = `지역: ${region}
장법: ${method}
종교: ${religion}
질문: ${question}

잠시만 기다려주시면 상담사가 안내해드립니다.`;

  res.json({
    version: "2.0",
    template: {
      outputs: [{
        simpleText: { text: summary }
      }]
    }
  });
};