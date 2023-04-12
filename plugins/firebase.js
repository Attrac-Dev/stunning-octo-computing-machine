// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import formConfig from "../static/firebaseConfig"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Initialize Firebase
const app = initializeApp(formConfig);
const analytics = getAnalytics(app);

export { app as firebaseApp, analytics as firebaseAnalytics }