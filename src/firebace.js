import {initializeApp} from 'firebase/app'
import {getAuth,onAuthStateChanged} from 'firebase/auth'

const firebaceApp =initializeApp({
    apiKey: "AIzaSyDTdMmMTI65HuOrl5yLuUppehL9Bw-et5E",
  authDomain: "minesweepergame1-6182c.firebaseapp.com",
  projectId: "minesweepergame1-6182c",
  storageBucket: "minesweepergame1-6182c.appspot.com",
  messagingSenderId: "985740842698",
  appId: "1:985740842698:web:808f7deeee965828e20633",
  measurementId: "G-22SMKRD33N"
})

const auth = getAuth(firebaceApp);

onAuthStateChanged(auth, ()=>{});