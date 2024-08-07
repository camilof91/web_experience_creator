/**
 * Crear un botón para mostrar y ocultar la barra lateral
 * @param asideBarId - El ID del elemento de la barra lateral
 * @returns {HTMLButtonElement} - El botón creado
 */
export const createRightToggleButton = (asideBarId: string): HTMLButtonElement => {
  const $toggleButton = document.createElement("button");

  $toggleButton.classList.add("toggle-right-bar");

  const $asidebar = document.getElementById(asideBarId);

  if (!$asidebar) {
    throw new Error(`No se encontró el elemento con ID ${asideBarId}`);
  }

  // Crear los SVG
  const svgLeft = `
  <svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 24 24">
    <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" color="currentColor">
      <path d="M22 12c0-3.75 0-5.625-.955-6.939a5 5 0 0 0-1.106-1.106C18.625 3 16.749 3 13 3h-2c-3.75 0-5.625 0-6.939.955A5 5 0 0 0 2.955 5.06C2 6.375 2 8.251 2 12s0 5.625.955 6.939a5 5 0 0 0 1.106 1.106C5.375 21 7.251 21 11 21h2c3.75 0 5.625 0 6.939-.955a5 5 0 0 0 1.106-1.106C22 17.625 22 15.749 22 12m-7.5-8.5v17M19 7h-1.5m1.5 4h-1.5" />
      <path d="m8 10l1.227 1.057c.515.445.773.667.773.943s-.258.498-.773.943L8 14" />
    </g>
  </svg>
  `;
  const svgRight = `
  <svg xmlns="http://www.w3.org/2000/svg" width="1.2rem" height="1.2rem" viewBox="0 0 24 24">
	<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M2 12c0-3.69 0-5.534.814-6.841a4.8 4.8 0 0 1 1.105-1.243C5.08 3 6.72 3 10 3h4c3.28 0 4.919 0 6.081.916c.43.338.804.759 1.105 1.243C22 6.466 22 8.31 22 12s0 5.534-.814 6.841a4.8 4.8 0 0 1-1.105 1.243C18.92 21 17.28 21 14 21h-4c-3.28 0-4.919 0-6.081-.916a4.8 4.8 0 0 1-1.105-1.243C2 17.534 2 15.69 2 12m12.5-9v18M18 7h1m-1 3h1" color="currentColor" />
</svg>
  `;

  // Crear el contenedor del SVG
  const $icon = document.createElement("div");
  $icon.innerHTML = svgLeft;
  $icon.classList.add("icon");

  // Agregar el SVG al botón
  $toggleButton.appendChild($icon);

  $toggleButton.addEventListener("click", () => {
    if ($asidebar.classList.contains("hidden")) {
      $asidebar.classList.remove("hidden");
      // Actualizar el SVG cuando se muestra el asidebar
      $icon.innerHTML = svgLeft; // Restaurar SVG inicial
    } else {
      $asidebar.classList.add("hidden");
      // Actualizar el SVG cuando se oculta el asidebar
      $icon.innerHTML = svgRight; // Cambiar a otro SVG
    }
  });

  return $toggleButton;
};
