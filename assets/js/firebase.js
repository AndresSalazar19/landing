import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import {
  getDatabase,
  ref,
  runTransaction,
  get,
  child,
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

/**
 * Incrementa el contador de votos para un producto usando runTransaction
 * @param {string} productID
 * @returns {Promise<Object>}
 */
export async function saveVote(productID) {
  const voteRef = ref(database, `votes/${productID}`);

  try {
    await runTransaction(voteRef, (currentVotes) => {
      return (currentVotes || 0) + 1;
    });
    return { success: true, message: "Voto guardado correctamente." };
  } catch (error) {
    return { success: false, message: "Error al guardar el voto.", error };
  }
}

/**
 * Obtiene todos los votos desde la colección "votes"
 * @returns {Promise<Object>}
 */
export async function getVotes() {
  const dbRef = ref(database);

  try {
    const snapshot = await get(child(dbRef, "votes"));
    if (snapshot.exists()) {
      return { success: true, data: snapshot.val() };
    } else {
      return { success: true, data: {} }; // No hay votos aún, pero no es error
    }
  } catch (error) {
    return { success: false, message: "Error al obtener los votos.", error };
  }
}
