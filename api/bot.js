// 카카오 챗봇 서버리스 함수 (Vercel 호환)

let userState = {};

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const body = req.body;
  const userId = body?.userRequest?.user?.id || "unknown";
  const utter = (body?.userRequest?.utterance || "").trim();

  if (!userState[userId]) {
    userState[userId] = { region: null, method: null, religion: null, question: null };
  }

  const state = userState[userId];

  function send(text, buttons = []) {
    return res.json({
      version: "2.0",
      template: {
        outputs: [{ simpleText: { text } }],
        quickReplies: buttons.map(b => ({
          label: b,
          action: "message",
          messageText: b
        }))
      }
    });
  }

  if (!state.region && !["수도권","전라권","경상권","충청권","강원권","제주"].includes(utter)) {
    return send(
      "안녕하세요, 한결 장지 상담 도우미입니다.\n아래 항목을 차례대로 선택해주시면 맞춤 상담을 도와드릴게요!",
      ["수도권","전라권","경상권","충청권","강원권","제주"]
    );
  }

  if (!state.region) {
    const list=["수도권","전라권","경상권","충청권","강원권","제주"];
    if (list.includes(utter)) state.region = utter;
    else return send("원하시는 지역을 선택해주세요.", list);
  }

  if (!state.method) {
    const list=["봉안묘","봉안당","수목장"];
    if (list.includes(utter)) state.method=utter;
    else return send(`지역: ${state.region}\n어떤 장법을 원하시나요?`, list);
  }

  if (!state.religion) {
    const list=["불교","기독교","천주교","무교","기타"];
    if (list.includes(utter)) state.religion=utter;
    else return send(`장법: ${state.method}\n종교를 선택해주세요.`, list);
  }

  if (!state.question) {
    if (utter !== state.religion) state.question=utter;
    else return send(`종교: ${state.religion}\n궁금하신 점을 자유롭게 입력해주세요!`);
  }

  const summary =
    `📌 상담 요청 내용\n` +
    `▪ 지역: ${state.region}\n` +
    `▪ 장법: ${state.method}\n` +
    `▪ 종교: ${state.religion}\n` +
    `▪ 문의 내용: ${state.question}\n\n` +
    `잠시만 기다려주시면 전문 상담사가 안내해드릴게요.`;

  userState[userId]={region:null,method:null,religion:null,question:null};

  return send(summary);
}