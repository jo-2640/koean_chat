// deleteFirestoreCollection.js (임시 파일 또는 개발자 콘솔에서 실행)

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, query, getDocs, deleteDoc, doc, writeBatch } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// !!! 여기에 실제 Firebase 프로젝트 설정을 입력하세요 !!!
// script.js에 있는 initializeApp 설정을 복사해 오세요.
const firebaseConfig = {
  apiKey: "AIzaSyAde9m8iF_aa47BWFFYxmtQmtSoa1chVCU",
  authDomain: "volcano-chat9.firebaseapp.com",
  projectId: "volcano-chat9",
  storageBucket: "volcano-chat9.firebasestorage.app",
  messagingSenderId: "975437366698",
  appId: "1:975437366698:web:4fb0a2a484ecd7f010d7d3",
  measurementId: "G-LE57RLRFJK"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function deleteCollection(collectionPath, batchSize = 100) {
    const collectionRef = collection(db, collectionPath);
    const q = query(collectionRef); // 모든 문서를 쿼리

    try {
        let snapshot;
        do {
            snapshot = await getDocs(q);
            const batch = writeBatch(db);
            const numDeleted = snapshot.size;

            if (numDeleted === 0) {
                console.log(`컬렉션 '${collectionPath}'에서 삭제할 문서가 없습니다.`);
                break;
            }

            snapshot.docs.forEach((doc) => {
                batch.delete(doc.ref);
            });

            await batch.commit();
            console.log(`${numDeleted}개 문서가 '${collectionPath}' 컬렉션에서 삭제되었습니다.`);

            // Firestore는 쿼리 결과에 따라 다음 배치를 가져오므로,
            // 재귀적으로 모든 문서를 삭제할 때까지 반복
        } while (snapshot.size > 0);

        console.log(`컬렉션 '${collectionPath}'와 모든 문서가 성공적으로 삭제되었습니다.`);
    } catch (error) {
        console.error(`컬렉션 '${collectionPath}' 삭제 중 오류 발생:`, error);
    }
}

// 이 함수를 호출하여 컬렉션을 삭제합니다.
// 웹 페이지에서 버튼 클릭 등으로 호출하거나, 개발자 콘솔에서 직접 호출하세요.
// 예시:
// deleteCollection('users'); // users 컬렉션 삭제
// deleteCollection('friendRequests'); // friendRequests 컬렉션 삭제