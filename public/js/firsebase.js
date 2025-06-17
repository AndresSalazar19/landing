// Importar desde CDN la versión 11.9.1 de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  push,
  get,
  child,
} from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";

// Configuración usando variables de entorno definidas en Vite
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Inicializar la aplicación Firebase
const app = initializeApp(firebaseConfig);

// Obtener referencia a la base de datos en tiempo real
const database = getDatabase(app);

/**
 * Guarda un voto en la colección "votes" con un ID de producto y la fecha actual
 * @param {string} productID - ID del producto votado
 * @returns {Promise<Object>} - Mensaje con éxito o error
 */
export function saveVote(productID) {
  const votesRef = ref(database, "votes");
  const newVoteRef = push(votesRef);

  const voteData = {
    productID,
    date: new Date().toISOString(),
  };

  return set(newVoteRef, voteData)
    .then(() => {
      return { success: true, message: "Voto guardado correctamente." };
    })
    .catch((error) => {
      return { success: false, message: "Error al guardar el voto.", error };
    });
}

/**
 * Obtiene todos los votos desde la colección "votes"
 * @returns {Promise<Object>} - Objeto con los votos o un mensaje de error
 */
export async function getVotes() {
  const dbRef = ref(database);

  try {
    const snapshot = await get(child(dbRef, "votes"));

    if (snapshot.exists()) {
      return { success: true, data: snapshot.val() };
    } else {
      return { success: false, message: "No se encontraron votos." };
    }
  } catch (error) {
    return { success: false, message: "Error al obtener los votos.", error };
  }
}
