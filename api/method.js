module.exports = (req, res) => {
  res.json({
    version: "2.0",
    template: {
      outputs: [{ simpleText: { text: "종교를 선택해주세요" } }],
      quickReplies: [
        { label: "불교", action: "message", messageText: "불교" },
        { label: "기독교", action: "message", messageText: "기독교" },
        { label: "천주교", action: "message", messageText: "천주교" },
        { label: "기타", action: "message", messageText: "기타" }
      ]
    }
  });
};