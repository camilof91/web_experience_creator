import { create } from "../../core/adapters/storage/localStorageManager";
import type { ComponentCreatorUI } from "../schema/schema";
import { updateLayerList } from "../../FilesLayers/useCases/updateLayerList";
import { createHtmlElement } from "./createHtmlComponent";
import { processElement } from "./createElementStyler";

/**
 * insertar elemetos en el HTML
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentElement
 */


export const createComponenetItemMenu = (componentCreatorrepresentation: ComponentCreatorUI) => {
  const $itemComponentMenu = document.createElement("li");
  $itemComponentMenu.classList.add("sidebar__item");
  $itemComponentMenu.textContent = componentCreatorrepresentation.name;
  $itemComponentMenu.dataset.info = JSON.stringify(componentCreatorrepresentation);
  $itemComponentMenu.dataset.id = componentCreatorrepresentation.id;
  $itemComponentMenu.id = componentCreatorrepresentation.id;

  // Hacer el elemento arrastrable
  $itemComponentMenu.setAttribute("draggable", "true");

  // Añadir eventos de arrastre
  $itemComponentMenu.addEventListener("dragstart", (e) => {
    console.log("Arrastre comenzo para", componentCreatorrepresentation.name, e);
    $itemComponentMenu.classList.add("dragging");
    e.dataTransfer.setData("application/json", JSON.stringify(componentCreatorrepresentation));
  });

  $itemComponentMenu.addEventListener("dragend", (e) => {
    console.log("El arrastre terminó para", componentCreatorrepresentation.name, e);
    $itemComponentMenu.classList.remove("dragging");
  });

  $itemComponentMenu.addEventListener("click", (e) => {
    console.log("Me estas tocando " + componentCreatorrepresentation.name, e)
  })

  return $itemComponentMenu;
};

export const inicializeDrop = () => {
  const $canvas = document.querySelector<HTMLElement>("main.canvas");

  $canvas.addEventListener("dragover", (event: DragEvent) => {
    event.preventDefault();
  });

  $canvas.addEventListener("drop", (event: DragEvent) => {
    event.preventDefault();
    const target = event.target as HTMLElement;
    const activeTab = document.querySelector<HTMLElement>(".canvas__tab--active");
    const canvasActive = target.closest<HTMLElement>(`.canvas__content#tab-content-${activeTab.dataset.tab}`);

    const containerStyles = document.querySelector("#canvas__styles");

    if (canvasActive) {
      const data = event.dataTransfer.getData("application/json");
      const componentData = JSON.parse(data);
      const newComponent = createHtmlElement(componentData);
      const {element, style} = processElement(newComponent)
      target.appendChild(element);
      containerStyles.appendChild(style);
      
      if (newComponent.closest(`.canvas__content#tab-content-${activeTab.dataset.tab}`) === canvasActive) {
        create("elements-added", { id: newComponent.id });
        const layerList = document.querySelector<HTMLElement>('#layer_list');
        if (layerList instanceof HTMLElement) {
          updateLayerList(canvasActive, layerList);
        }
      }
    }
  });
}



