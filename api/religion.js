module.exports = (req, res) => {
  res.json({
    version: "2.0",
    template: {
      outputs: [{ simpleText: { text: "이제 궁금한 내용을 입력해주세요!" } }]
    }
  });
};