const express = require("express");

const app = express();
app.use(express.json());

// In-memory user state (for production, use Redis/DB)
const userState = {}; 
// userState[userId] = { region, method, religion, question }

// helper to build Kakao i OpenBuilder response
function sendResponse(text, buttons = []) {
  const res = {
    version: "2.0",
    template: {
      outputs: [{ simpleText: { text } }]
    }
  };

  if (buttons.length > 0) {
    res.template.quickReplies = buttons.map((b) => ({
      label: b,
      action: "message",
      messageText: b
    }));
  }

  return res;
}

app.post("/bot", (req, res) => {
  try {
    const body = req.body || {};
    const userId =
      body.userRequest?.user?.id ||
      body.userRequest?.user?.properties?.plusfriendUserKey ||
      "anonymous";
    const utter = (body.userRequest?.utterance || "").trim();

    if (!userState[userId]) {
      userState[userId] = {
        region: null,
        method: null,
        religion: null,
        question: null
      };
    }

    const state = userState[userId];

    // 0) start greeting + region selection
    if (!state.region) {
      const regions = ["수도권", "강원권", "충청권", "경상권", "전라권", "제주"];
      if (regions.includes(utter)) {
        state.region = utter;
      } else {
        return res.json(sendResponse(
          "안녕하세요, 한결 장지 상담 도우미입니다.\n아래 항목을 차례대로 선택해주시면 맞춤 상담을 도와드릴게요.\n\n먼저 원하시는 지역을 선택해주세요.",
          regions
        ));
      }
    }

    // 1) method selection
    if (!state.method) {
      const methods = ["봉안묘", "봉안당", "수목장"];
      if (methods.includes(utter)) {
        state.method = utter;
      } else {
        return res.json(sendResponse(
          `지역: ${state.region}\n어떤 장법을 원하시나요?`,
          methods
        ));
      }
    }

    // 2) religion selection
    if (!state.religion) {
      const religions = ["불교", "기독교", "천주교", "무교", "기타"];
      if (religions.includes(utter)) {
        state.religion = utter;
      } else {
        return res.json(sendResponse(
          `장법: ${state.method}\n종교를 선택해주세요.`,
          religions
        ));
      }
    }

    // 3) free question input
    if (!state.question) {
      // if user typed something other than the religion button, treat as question
      if (utter && utter !== state.religion) {
        state.question = utter;
      } else {
        return res.json(sendResponse(
          `종교: ${state.religion}\n궁금하신 점을 자유롭게 입력해주세요!`
        ));
      }
    }

    // 4) summary + handoff message
    const summary =
      `📌 상담 요청 내용 요약\n` +
      `▪ 지역: ${state.region}\n` +
      `▪ 장법: ${state.method}\n` +
      `▪ 종교: ${state.religion}\n` +
      `▪ 문의 내용: ${state.question}\n\n` +
      `잠시만 기다려주시면 전문 상담사가 안내해드릴게요.`;

    // reset after summary
    userState[userId] = { region: null, method: null, religion: null, question: null };

    return res.json(sendResponse(summary));
  } catch (e) {
    console.error(e);
    return res.json(sendResponse("일시적인 오류가 발생했어요. 잠시 후 다시 시도해주세요."));
  }
});

// local dev
if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log("Bot server running on " + port));
}

module.exports = app;