import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyB8vkYz3PmVw8oS66WUiCaesnpW-TZMfOM",
  authDomain: "blogs-d9dfa.firebaseapp.com",
  projectId: "blogs-d9dfa",
  storageBucket: "blogs-d9dfa.appspot.com",
  messagingSenderId: "26820221979",
  appId: "1:26820221979:web:b328706703677b4da3ecbe",
  measurementId: "G-VL2KV4VP0R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);