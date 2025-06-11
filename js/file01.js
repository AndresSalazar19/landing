"use strict";
import { saveVote } from "./firsebase.js";
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
    } else {
      console.error("Error al obtener los datos:", result.error);
    }
  } catch (error) {
    console.error("Ocurrió un error inesperado:", error);
  }
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
      }

      form.reset();
    });
  }
};

(() => {
  loadData();
  showToast();
  showVideo();
  enableForm();
})();
