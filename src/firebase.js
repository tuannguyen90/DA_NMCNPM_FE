// src/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "donggoptuthien.firebaseapp.com",
  projectId: "donggoptuthien",
  storageBucket: "donggoptuthien.appspot.com",
  messagingSenderId: "435983037420",
  appId: "1:435983037420:web:029bc71692f7630a66c6c9",
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
