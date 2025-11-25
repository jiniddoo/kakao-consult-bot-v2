module.exports = (req, res) => {
  res.json({
    version: "2.0",
    template: {
      outputs: [{ simpleText: { text: "장법을 선택해주세요" } }],
      quickReplies: [
        { label: "봉안묘", action: "message", messageText: "봉안묘" },
        { label: "봉안당", action: "message", messageText: "봉안당" },
        { label: "수목장", action: "message", messageText: "수목장" }
      ]
    }
  });
};