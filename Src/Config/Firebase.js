import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  setDoc,
  getDoc,
  getDocs,
  query,
  doc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCdT7-pVCJPE_oPOSBt4f3ICSxGHntmopo",
  authDomain: "foodpanda-ebada.firebaseapp.com",
  projectId: "foodpanda-ebada",
  storageBucket: "foodpanda-ebada.appspot.com",
  messagingSenderId: "669412831717",
  appId: "1:669412831717:web:92ed280c6df98fb68fff0c",
  measurementId: "G-BBSNKQR1YM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

async function Register(form) {
  const { name, email, password } = form;
  const result = await createUserWithEmailAndPassword(auth, email, password);
  const uid = result.user.uid;
  console.log("---------> Register is ok");

  await setDoc(doc(db, "users", uid), {
    email,
    name,
    uid,
  });
}

async function toLogin(email, password) {
  await signInWithEmailAndPassword(auth, email, password);
}

async function addResturants() {
  const q = query(collection(db, "resturant"));
  const querySnapshot = await getDocs(q);
  let data = [];
  querySnapshot.forEach((doc) => {
    // data = [...data, doc.data()]
    const ad = { ...doc.data(), id: doc.id };
    console.log("ad", data);
    data.push(ad);
  });
  console.log("firebase", data);
  return data;
}

async function getdetail(addId) {
  const docRef = await doc(db, "resturant", addId);
  const docSnap = await getDoc(docRef);
  console.log("docsnap-->", docSnap.data());
  return docSnap.data();
}

async function getUserInfo() {
  const uid = auth.currentUser.uid;
  console.log("uid", uid);
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  console.log("user Data --> ", docSnap.data());
  return docSnap.data();
}

async function getRestaurentMenu(id) {
  const uid = auth.currentUser.uid;
  console.log(id, "uid --->", uid);
  console.log("menu ki ID --->", id);
  let menu = [];
  const querySnapshot = await getDocs(
    collection(db, "resturant", id, "menuItem")
  );
  querySnapshot.forEach((doc) => {
    const temp = { ...doc.data(), id: doc.id };
    menu.push(temp);
  });
  console.log("myMenu--->", menu);
  return menu;
}

// async function getMenuId() {
//   const uid = auth.currentUser.uid;
//   console.log("Menu ID ----->", uid);
//   const docRef = getDocs(collection(db, "resturant", id, "menuItem"));
//   const docSnap = await getDoc(docRef);
//   console.log("Menu Ka Data --> ", docSnap.data());
//   return docSnap.data();
// }

export {
  Register,
  toLogin,
  addResturants,
  getdetail,
  getUserInfo,
  getRestaurentMenu,
  //   getMenuId,
};
