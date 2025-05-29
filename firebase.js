import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAfxIs4x2-vtEV8lMEtN5MYXV_fDS62rV4",
  authDomain: "planty-9b3aa.firebaseapp.com",
  projectId: "planty-9b3aa",
  storageBucket: "planty-9b3aa.appspot.com",
  messagingSenderId: "24103227626",
  appId: "1:24103227626:web:8dcaa2675e2ddbae33c793"
};

export const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export const db = getFirestore(app); 

