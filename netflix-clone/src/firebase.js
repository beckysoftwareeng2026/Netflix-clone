import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify/unstyled";


const firebaseConfig = {
    apiKey: "AIzaSyA34bINJiFlngaOvy0-n4swRdlepLxMBug",
    authDomain: "netflix-clone-eca51.firebaseapp.com",
    projectId: "netflix-clone-eca51",
    storageBucket: "netflix-clone-eca51.firebasestorage.app",
    messagingSenderId: "395379362820",
    appId: "1:395379362820:web:8fc992571108a5b9b7f951",
    measurementId: "G-XFCPMVP75H"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

const signup = async (name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('_').join(" "));


    }


}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('_').join(" "));
    }
};
const logout = async () => {
    await signOut(auth);
    console.log("Sign out successful");
};
export { auth, db, login, signup, logout };


