import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCuYTYwaxNc0SdzTP2Q122UOeUHmGApc4Y",
    authDomain: "shelf-life-49fe1.firebaseapp.com",
    projectId: "shelf-life-49fe1",
    storageBucket: "shelf-life-49fe1.appspot.com",
    messagingSenderId: "224197377287",
    appId: "1:224197377287:web:4f134aacb0bf72e94019a2",
    measurementId: "G-CR46CM6LXQ"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
