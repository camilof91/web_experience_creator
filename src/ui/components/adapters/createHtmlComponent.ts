
import { generateUniqueId } from "../../core/useCases/storage/idGeneretor";
import type { ComponentCreatorUI } from "../schema/schema";
import { elementSyncStylesTools } from "./style.toolkit";

export const createHtmlElement =(config: ComponentCreatorUI) => {
// Creamos el elemento HTML
  const element = document.createElement(config.type);
    
// Configuramos los atributos del elemento si config.attributes está definido
  if (config.attributes) {
    Object.keys(config.attributes).forEach((attribute) => {
      element.setAttribute(attribute, config.attributes[attribute]);
    });
  }
    
// Configuramos el contenido de texto  
  if (config.text && config.text.trim().length > 0) {
    element.textContent = config.text;
  }

// Configuramos los hijos 
  if (config.children && config.children.length > 0) {
    config.children.forEach(childConfig => {
      const childElement = createHtmlElement(childConfig);
      element.appendChild(childElement);
    });
  }  



  element.id = generateUniqueId();
  element.dataset.elementType = config.type;

  element.addEventListener("dblclick", elementSyncStylesTools(element))
  

  return element;
}

// Ejemplo se uso:
/* Con cada objeto de la variable componentsCreators
componentsCreators.forEach((config) => {
  const element = createHtmlElement(config);
  console.log('AQUI ESTOY:', element);
});


// Agregar el elemento al DOM

function addComponentsToDOM(components) {
  components.forEach(config => {
    const element = createHtmlElement(config);
    document.body.appendChild(element);
  });
}
  
  
addComponentsToDOM(componentsCreators);
*/
  