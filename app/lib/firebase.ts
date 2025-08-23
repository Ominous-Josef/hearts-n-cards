import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { FirebaseConfig } from "~/config";

const app = initializeApp({
  apiKey: FirebaseConfig.apiKey,
  authDomain: FirebaseConfig.authDomain,
  projectId: FirebaseConfig.projectId,
  storageBucket: FirebaseConfig.storageBucket,
  messagingSenderId: FirebaseConfig.messagingSenderId,
  appId: FirebaseConfig.appId,
});

export const fireDB = getFirestore(app);
