"use strict";

(function() {
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

(() => {
    showToast();
    showVideo();
})();