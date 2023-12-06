import { initializeApp } from "firebase/app";
import {
	initializeAuth,
	TwitterAuthProvider,
	getReactNativePersistence,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
	apiKey: "AIzaSyA72DEVqTfVyMnZPNPGgjxjG0BcnuNvZNo",
	authDomain: "task-app-414e3.firebaseapp.com",
	projectId: "task-app-414e3",
	storageBucket: "task-app-414e3.appspot.com",
	messagingSenderId: "471142694252",
	appId: "1:471142694252:web:36e286e0fe6ea327ad8749",
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
	persistence: getReactNativePersistence(AsyncStorage),
});

export { auth, TwitterAuthProvider };
