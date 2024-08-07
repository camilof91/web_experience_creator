
/**
 * Crear un botón para mostrar y ocultar la barra lateral
 * @param sidebarId - El ID del elemento de la barra lateral
 * @returns {HTMLButtonElement} - El botón creado
 */
export const createToggleButton = (sidebarId: string): HTMLButtonElement => {
  const $toggleButton = document.createElement("button");

  $toggleButton.classList.add("toggle-sidebar-button");
  
  const $sidebar = document.getElementById(sidebarId);
  
  if (!$sidebar) {
    throw new Error(`No se encontró el elemento con ID ${sidebarId}`);
  }

  // Crear los SVG
  const svgLeft = `
  <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 24 24">
    <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" color="currentColor">
      <path d="M2 12c0-3.75 0-5.625.955-6.939A5 5 0 0 1 4.06 3.955C5.375 3 7.251 3 11 3h2c3.75 0 5.625 0 6.939.955a5 5 0 0 1 1.106 1.106C22 6.375 22 8.251 22 12s0 5.625-.955 6.939a5 5 0 0 1-1.106 1.106C18.625 21 16.749 21 13 21h-2c-3.75 0-5.625 0-6.939-.955a5 5 0 0 1-1.106-1.106C2 17.625 2 15.749 2 12m7.5-8.5v17M5 7h1.5M5 11h1.5" />
      <path d="m17 10l-1.226 1.057c-.516.445-.774.667-.774.943s.258.498.774.943L17 14" />
    </g>
  </svg>
  `;
const svgRight = `
  <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" viewBox="0 0 24 24">
    <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2 12c0-3.69 0-5.534.814-6.841a4.8 4.8 0 0 1 1.105-1.243C5.08 3 6.72 3 10 3h4c3.28 0 4.919 0 6.081.916c.43.338.804.759 1.105 1.243C22 6.466 22 8.31 22 12s0 5.534-.814 6.841a4.8 4.8 0 0 1-1.105 1.243C18.92 21 17.28 21 14 21h-4c-3.28 0-4.919 0-6.081-.916a4.8 4.8 0 0 1-1.105-1.243C2 17.534 2 15.69 2 12m7.5-9v18M5 7h1m-1 3h1" color="currentColor" />
  </svg>
  `;

  // Crear el contenedor del SVG
  const $icon = document.createElement("div");
  $icon.innerHTML = svgLeft;
  $icon.classList.add("icon");

  // Agregar el SVG al botón
  $toggleButton.appendChild($icon);
  
  $toggleButton.addEventListener("click", () => {
    if ($sidebar.classList.contains("hidden")) {
      $sidebar.classList.remove("hidden");
      // Actualizar el SVG cuando se muestra el sidebar
      $icon.innerHTML = svgLeft; // Restaurar SVG inicial
    } else {
      $sidebar.classList.add("hidden");
      // Actualizar el SVG cuando se oculta el sidebar
      $icon.innerHTML = svgRight; // Cambiar a otro SVG
    }
  });
  
  return $toggleButton;
};
