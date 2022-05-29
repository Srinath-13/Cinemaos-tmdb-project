import Firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCLqw2nr-M7G5Fl8GN63x9cvkgNaJuNlEc",
    authDomain: "cinemaos-tmdb-project.firebaseapp.com",
    projectId: "cinemaos-tmdb-project",
    storageBucket: "cinemaos-tmdb-project.appspot.com",
    messagingSenderId: "808497963104",
    appId: "1:808497963104:web:fb8330049845f91cd2a305"
};
const firebase = Firebase.initializeApp(firebaseConfig);
const db = getFirestore(firebase);
export { firebase };
export { db };