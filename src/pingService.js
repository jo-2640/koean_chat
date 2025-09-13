
import {SERVER_BASE_URL } from './constants.js';
import {questions} from './koreanWordLists.js' ;
const messages = Array.from({ length: 100 }, (_, i) => `랜덤 메시지 #${i + 1}`);

// 3. 메시지 전송 함수
export async function sendRandomQuestion() {
   const randomQuestion = questions[Math.floor(Math.random() * questions.length)];

  try {
    const res = await fetch(`${SERVER_BASE_URL}/ping`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: randomQuestion,
        sender: "auto-bot", // 필요 시 사용자 ID나 닉네임
        createdAt: new Date().toISOString(),
      }),
    });

    if (!res.ok) {
      console.error("❌ 서버 응답 오류:", res.status, await res.text());
    } else {
      console.log("✅ 메시지 전송 성공:", randomQuestion);
    }
  } catch (err) {
    console.error("🚨 전송 실패:", err);
  }
}

// 4. 10분(600,000ms)마다 메시지 전송
setInterval(sendRandomQuestion, 10 * 60 * 1000);

// 시작할 때 한 번 실행
sendRandomQuestion();
