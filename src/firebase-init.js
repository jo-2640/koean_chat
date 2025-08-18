// src/firebase-init.js

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getAuth, browserSessionPersistence, setPersistence } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
import { getStorage } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js';


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAde9m8iF_aa47BWFFYxmtQmtSoa1chVCU",
  authDomain: "volcano-chat9.firebaseapp.com",
  projectId: "volcano-chat9",
  storageBucket: "volcano-chat9.firebasestorage.app",
  messagingSenderId: "975437366698",
  appId: "1:975437366698:web:4fb0a2a484ecd7f010d7d3",
  measurementId: "G-LE57RLRFJK"
};

// --- Firebase 앱 초기화 ---
const firebaseAppInstance = initializeApp(firebaseConfig);

// --- Firebase 서비스 인스턴스 export ---
export const auth = getAuth(firebaseAppInstance);
export const db = getFirestore(firebaseAppInstance);
export const storage = getStorage(firebaseAppInstance);

console.log(`firebase auth:${auth}`);
// --- Firebase Auth Persistence 전역 설정 ---
setPersistence(auth, browserSessionPersistence)
    .then(() => {
        console.log("[Firebase Init] Firebase Auth persistence가 SESSION으로 전역 설정되었습니다.");
    })
    .catch((error) => {
        console.error("[Firebase Init] Firebase Auth persistence 전역 설정 오류:", error);
    });
