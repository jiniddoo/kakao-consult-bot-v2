module.exports = (req, res) => {
  res.json({
    version: "2.0",
    template: {
      outputs: [{ simpleText: { text: "종교를 선택해주세요" } }],
      quickReplies: [
        { label: "불교", action: "block", blockId: "religion" },
        { label: "기독교", action: "block", blockId: "religion" },
        { label: "천주교", action: "block", blockId: "religion" },
        { label: "무교", action: "block", blockId: "religion" },
        { label: "기타", action: "block", blockId: "religion" }
      ]
    }
  });
};