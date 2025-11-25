module.exports = (req, res) => {
  res.json({
    version: "2.0",
    template: {
      outputs: [{ simpleText: { text: "장법을 선택해주세요" } }],
      quickReplies: [
        { label: "봉안묘", action: "block", blockId: "method" },
        { label: "봉안당", action: "block", blockId: "method" },
        { label: "수목장", action: "block", blockId: "method" }
      ]
    }
  });
};