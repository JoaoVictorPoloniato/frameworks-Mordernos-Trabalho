import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyAUp1ppyeAlj04lmgK5ZycUtECfZ5Ipt4E",
  authDomain: "pocoes-eb3f4.firebaseapp.com",
  projectId: "pocoes-eb3f4",
  storageBucket: "pocoes-eb3f4.firebasestorage.app",
  messagingSenderId: "504928200612",
  appId: "1:504928200612:web:a83c74cb49d2776377c331"
};

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()