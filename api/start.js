module.exports = (req, res) => {
  res.json({
    version: "2.0",
    template: {
      outputs: [{
        carousel: {
          type: "basicCard",
          items: [{
            title: "지역을 선택해주세요",
            buttons: [
              { label: "수도권", action: "block", blockId: "region" },
              { label: "강원권", action: "block", blockId: "region" },
              { label: "충청권", action: "block", blockId: "region" },
              { label: "경상권", action: "block", blockId: "region" },
              { label: "전라권", action: "block", blockId: "region" },
              { label: "제주", action: "block", blockId: "region" }
            ]
          }]
        }
      }]
    }
  });
};