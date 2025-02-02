import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCXzKPTRWY2AgNKJMkUpbP-MJeIs4QzhAs",
  authDomain: "events-platform-91fd6.firebaseapp.com",
  projectId: "events-platform-91fd6",
  storageBucket: "events-platform-91fd6.firebasestorage.app",
  messagingSenderId: "786125819176",
  appId: "1:786125819176:web:7608970ac1ad098559d41d",
  measurementId: "G-TTY29C3VZK",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
