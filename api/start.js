module.exports = (req, res) => {
  res.json({
    version: "2.0",
    template: {
      outputs: [{
        basicCard: {
          title: "지역을 선택해주세요",
          buttons: [
            { label: "수도권", action: "message", messageText: "수도권" },
            { label: "강원권", action: "message", messageText: "강원권" },
            { label: "충청권", action: "message", messageText: "충청권" },
            { label: "경상권", action: "message", messageText: "경상권" },
            { label: "전라권", action: "message", messageText: "전라권" },
            { label: "제주", action: "message", messageText: "제주" }
          ]
        }
      }]
    }
  });
};