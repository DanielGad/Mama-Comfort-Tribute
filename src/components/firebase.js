import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDRLlw_PFraCbmGbIpq5Epq2HFozS35OMo",
  authDomain: "mama-comfort-tribute.firebaseapp.com",
  projectId: "mama-comfort-tribute",
  storageBucket: "mama-comfort-tribute.appspot.com",
  messagingSenderId: "47637660416",
  appId: "1:47637660416:web:6dc4bfaaf2241f1017a9e5",
  measurementId: "G-4TG99XPJTE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app)
const database = getFirestore(app)

export {storage, database};
