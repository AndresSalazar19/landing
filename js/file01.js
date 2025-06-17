"use strict";
import { saveVote, getVotes } from "./firsebase.js";
import { fetchFakerData } from "./functions.js";

(function () {
  const mensaje = "¡Bienvenido a la página!";
  alert(mensaje);
  console.log(mensaje);
})();

/**
 * Muestra un toast de bienvenida si existe el elemento con el ID 'toast-interactive'.
 * @function
 * @returns {void}
 */
const showToast = () => {
  const toast = document.getElementById("toast-interactive");
  if (toast) {
    toast.classList.add("md:block");
  }
};

/**
 * Agrega un evento click al elemento con el ID 'demo' para abrir un video de YouTube en una nueva pestaña.
 * @function
 * @returns {void}
 */
const showVideo = () => {
  const demo = document.getElementById("demo");
  if (demo) {
    demo.addEventListener("click", () => {
      window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
    });
  }
};

const loadData = async () => {
  const url = "https://fakerapi.it/api/v2/texts?_quantity=10&_characters=120";

  try {
    const result = await fetchFakerData(url);

    if (result.success) {
      console.log("Datos obtenidos con éxito:", result.body);
      renderCards(result.body.data);
    } else {
      console.error("Error al obtener los datos:", result.error);
    }
  } catch (error) {
    console.error("Ocurrió un error inesperado:", error);
  }
};

const renderCards = (dataArray) => {
  // Obtener el contenedor donde se renderizarán las cards
  const container = document.getElementById("skeleton-container");

  if (!container) {
    console.error('Elemento con ID "skeleton-container" no encontrado');
    return;
  }

  // Limpiar el contenedor antes de renderizar
  container.innerHTML = "";

  // Tomar solo los primeros 3 elementos del arreglo
  const firstThreeItems = dataArray.slice(0, 3);

  // Iterar sobre los primeros 3 elementos
  firstThreeItems.forEach((item) => {
    // Crear la plantilla card con Tailwind CSS v4
    const cardHTML = `
      <div class="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-shadow duration-300">
        <!-- Header de la card -->
        <div class="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4">
          <h3 class="text-xl font-bold text-white truncate">${item.title}</h3>
          <p class="text-blue-100 text-sm mt-1">por ${item.author}</p>
        </div>
        
        <!-- Contenido de la card -->
        <div class="p-6">
          <!-- Género -->
          <div class="mb-4">
            <span class="inline-block bg-gray-100 text-gray-800 text-xs font-semibold px-3 py-1 rounded-full">
              ${item.genre}
            </span>
          </div>
          
          <!-- Contenido -->
          <div class="text-gray-700 leading-relaxed">
            <p class="line-clamp-3">${item.content}</p>
          </div>
          
          <!-- Footer con botón -->
          <div class="mt-6 pt-4 border-t border-gray-100">
            <button class="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium py-2 px-4 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105">
              Leer más
            </button>
          </div>
        </div>
      </div>
    `;

    // Agregar la card al contenedor
    container.innerHTML += cardHTML;
  });
};

const enableForm = () => {
  const form = document.getElementById("form_voting");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const input = document.getElementById("select_product");
      const value = input?.value;

      if (value) {
        saveVote(value);
        displayVotes();
      }

      form.reset();
    });
  }
};

/**
 * Muestra los votos en una tabla dentro del contenedor #results
 */
const displayVotes = async () => {
  const resultsDiv = document.getElementById("results");
  if (!resultsDiv) return;

  const result = await getVotes();

  if (!result.success) {
    resultsDiv.innerHTML = `<p class="text-red-500 text-center">${result.message}</p>`;
    return;
  }

  const votes = result.data;

  const voteCounts = {};
  for (const key in votes) {
    const vote = votes[key];
    if (vote?.productID) {
      voteCounts[vote.productID] = (voteCounts[vote.productID] || 0) + 1;
    }
  }

  let tableHTML = `
    <table class="w-full text-left border-collapse">
      <thead>
        <tr>
          <th class="border-b p-2 text-gray-700">Producto</th>
          <th class="border-b p-2 text-gray-700">Total de Votos</th>
        </tr>
      </thead>
      <tbody>
  `;

  for (const productID in voteCounts) {
    tableHTML += `
      <tr>
        <td class="border-b p-2 text-gray-800">${productID}</td>
        <td class="border-b p-2 text-gray-800">${voteCounts[productID]}</td>
      </tr>
    `;
  }

  tableHTML += `</tbody></table>`;
  resultsDiv.innerHTML = tableHTML;
};

(() => {
  loadData();
  showToast();
  showVideo();
  enableForm();
  displayVotes();
})();
