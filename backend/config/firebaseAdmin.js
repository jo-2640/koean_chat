// backend/config/firebaseAdmin.js
const admin = require('firebase-admin');
const path = require('path')

// 환경 변수에서 JSON 문자열을 가져옵니다.
const serviceAccountString = require(path.join(__dirname, 'FIREBASE_ADMIN_CREDENTIALS.json'));

if (!serviceAccountString) {
    throw new Error("FIREBASE_ADMIN_CREDENTIALS 환경변수가 설정되지 않았습니다.");
}

// JSON 문자열을 JavaScript 객체로 파싱합니다.

// 파싱된 객체를 사용하여 Firebase Admin SDK를 초기화합니다.
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const auth = admin.auth();

console.log("Firebase Admin SDK가 초기화되었습니다.");

module.exports = { admin, db, auth };