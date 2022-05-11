import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC4NgmcrepwoR0Pipsz4Xpe-fPhbuiXegk",
  authDomain: "netflix-2661a.firebaseapp.com",
  projectId: "netflix-2661a",
  storageBucket: "netflix-2661a.appspot.com",
  messagingSenderId: "940953498705",
  appId: "1:940953498705:web:e093266bcf6510bb7ff470",
  measurementId: "G-Q27YS3G9HS",
};
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export { storage, app };
