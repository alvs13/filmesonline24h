import { getFirestore, collection, addDoc } from "firebase/firestore";
import { firebaseApp } from "./firebaseConfig";

const db = getFirestore(firebaseApp);
const moviesCollection = collection(db, "movies");

export const addMovie = async (movieData) => {
  const docRef = await addDoc(moviesCollection, movieData);
  return docRef.id;
};