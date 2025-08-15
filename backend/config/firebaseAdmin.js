// backend/config/firebaseAdmin.js
const admin = require('firebase-admin');
const { FIREBASE_ADMIN_CREDENTIALS } = require('./env');
const serviceAccountString = process.env.FIREBASE_ADMIN_CREDENTIALS;

if(!serviceAccountString){
    throw new Error("FIREBASE_ADMIN_CREDENTIALS 환경변수가 설정되지 않았습니다.");
}  // 경로 조정 필요
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const auth = admin.auth(); // auth도 함께 내보내기

console.log("Firebase Admin SDK가 초기화되었습니다.");

module.exports = { admin, db, auth };