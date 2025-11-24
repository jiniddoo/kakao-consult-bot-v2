// Vercel Serverless Function for Kakao i OpenBuilder Skill
// Endpoint: /api/bot  (POST)

let userState = {}; 
// userState[userId] = { region, method, religion, question }

function sendResponse(text, buttons = []) {
  return {
    version: "2.0",
    template: {
      outputs: [{ simpleText: { text } }],
      quickReplies: buttons.map((b) => ({
        label: b,
        action: "message",
        messageText: b
      }))
    }
  };
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(200).json(sendResponse("POST 요청만 지원합니다."));
  }

  try {
    const body = req.body;
    const userId = body?.userRequest?.user?.id || "anonymous";
    const utter = (body?.userRequest?.utterance || "").trim();

    if (!userState[userId]) {
      userState[userId] = {
        region: null,
        method: null,
        religion: null,
        question: null
      };
    }

    const state = userState[userId];

    // 0️⃣ Welcome / Start → 지역 선택
    if (!state.region) {
      const regions = ["수도권", "강원권", "충청권", "경상권", "전라권", "제주"];
      if (regions.includes(utter)) {
        state.region = utter;
      } else {
        return res.status(200).json(sendResponse(
          "안녕하세요, 한결 장지 상담 도우미입니다.\n아래 항목을 차례대로 선택해주시면 맞춤 상담을 도와드릴게요.\n\n1) 지역을 선택해주세요.",
          regions
        ));
      }
    }

    // 1️⃣ region → 장법 선택
    if (!state.method) {
      const methods = ["봉안묘", "봉안당", "수목장"];
      if (methods.includes(utter)) {
        state.method = utter;
      } else {
        return res.status(200).json(sendResponse(
          `지역: ${state.region}\n\n2) 어떤 장법을 원하시나요?`,
          methods
        ));
      }
    }

    // 2️⃣ method → 종교 선택
    if (!state.religion) {
      const religions = ["불교", "기독교", "천주교", "무교", "기타"];
      if (religions.includes(utter)) {
        state.religion = utter;
      } else {
        return res.status(200).json(sendResponse(
          `장법: ${state.method}\n\n3) 종교를 선택해주세요.`,
          religions
        ));
      }
    }

    // 3️⃣ religion → 질문 입력
    if (!state.question) {
      // 종교 버튼을 다시 누른 경우는 질문으로 저장하지 않음
      if (utter && utter !== state.religion) {
        state.question = utter;
      } else {
        return res.status(200).json(
          sendResponse(`종교: ${state.religion}\n\n4) 궁금하신 점을 자유롭게 입력해주세요!`)
        );
      }
    }

    // 4️⃣ question → 요약 + 상담 연결 멘트
    const summary =
      `📌 상담 요청 내용 요약\n` +
      `▪ 지역: ${state.region}\n` +
      `▪ 장법: ${state.method}\n` +
      `▪ 종교: ${state.religion}\n` +
      `▪ 문의 내용: ${state.question}\n\n` +
      `잠시만 기다려주시면 전문 상담사가 안내해드릴게요.`;

    // reset state
    userState[userId] = { region: null, method: null, religion: null, question: null };

    return res.status(200).json(sendResponse(summary));
  } catch (e) {
    console.error(e);
    return res.status(200).json(sendResponse("에러가 발생했어요. 다시 시도해주세요."));
  }
}
