"use strict";
import { saveVote, getVotes } from "./firebase.js";
import { designs } from "./designs.js";

/**
 * Muestra toast si existe
 */
const showToast = () => {
  const toast = document.getElementById("toast-interactive");
  if (toast) toast.classList.add("md:block");
};

/**
 * Click en demo abre video
 */
const showVideo = () => {
  const demo = document.getElementById("demo");
  if (demo) {
    demo.addEventListener("click", () => {
      window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
    });
  }
};

let currentVotes = {}; // votos desde Firebase

/**
 * Renderiza productos con votos y botón de votar
 */
const renderCards = (dataArray) => {
  const maxVotes = Math.max(...Object.values(currentVotes || {}));
  const topVotedIDs = Object.keys(currentVotes).filter(
    (id) => currentVotes[id] === maxVotes && maxVotes > 0
  );

  const container = document.getElementById("skeleton-container");
  if (!container) return;
  container.innerHTML = "";

  dataArray.forEach((item) => {
    const votesCount = currentVotes[item.id] || 0;
    const isTop = topVotedIDs.includes(item.id);

  const cardHTML = `
    <div class="relative rounded-lg overflow-hidden p-6 mb-6 transition-shadow duration-300 shadow-md 
      ${isTop 
        ? 'border-2 border-yellow-400 dark:border-yellow-500' 
        : 'border border-gray-200 dark:border-gray-700'} 
      bg-white dark:bg-gray-800">

      ${isTop ? `
      <div class="absolute -top-0 left-1/2 transform -translate-x-1/2 bg-yellow-400 dark:bg-yellow-500 text-black text-xs font-bold px-4 py-1 rounded-full shadow-lg animate-bounce z-10">
          🔥 ¡En la cima!
        </div>
      ` : ''}

      <img src="${item.image}" alt="${item.title}" class="w-full h-48 object-cover mb-4 rounded-lg" />
      <h3 class="text-lg font-bold mb-1 text-gray-900 dark:text-white">${item.title}</h3>
      <p class="mb-4 text-sm text-gray-600 dark:text-gray-300">${item.description || ''}</p>
      <div class="flex items-center justify-between">
        <button data-id="${item.id}" class="vote-button bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          Votar
        </button>
        <span class="votes-count text-sm text-gray-700 dark:text-gray-200">
          Votos: <strong>${votesCount}</strong>
        </span>
      </div>
    </div>
  `;


    container.innerHTML += cardHTML;
  });

  // Vuelve a agregar eventos a los botones
  container.querySelectorAll(".vote-button").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const productID = btn.getAttribute("data-id");
      if (!productID) return;

      btn.disabled = true;

      const result = await saveVote(productID);
      if (result.success) {
        currentVotes[productID] = (currentVotes[productID] || 0) + 1;
        renderCards(dataArray); // 🔄 Actualiza la UI para marcar nuevos tops
      } else {
        alert("Error al guardar el voto, intenta de nuevo.");
      }

      btn.disabled = false;
    });
  });
};




/**
 * Carga productos reales desde API y renderiza con votos
 */
const init = async () => {
  const votesResult = await getVotes();
  currentVotes = votesResult.success ? votesResult.data : {};
  renderCards(designs);
};

/**
 * Muestra tabla con votos totales
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

  // votes ya es objeto { productID: votos }
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

  for (const productID in votes) {
    tableHTML += `
      <tr>
        <td class="border-b p-2 text-gray-800">${productID}</td>
        <td class="border-b p-2 text-gray-800">${votes[productID]}</td>
      </tr>
    `;
  }

  tableHTML += `</tbody></table>`;
  resultsDiv.innerHTML = tableHTML;
};

(() => {
  init(); 
  showToast();
  showVideo();
  displayVotes();
})();
