module.exports = (req, res) => {
  res.json({
    version: "2.0",
    template: {
      outputs: [{ simpleText: { text: "자유롭게 질문을 입력해주세요" } }]
    }
  });
};