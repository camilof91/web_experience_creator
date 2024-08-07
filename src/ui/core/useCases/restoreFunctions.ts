/*
OBJETIVO:
Aqui estamos definiendo las funcion restoreDOM, esta funcion recontruye en DOM
apartir el miniDOM
*/
export const restoreDOM = (miniDOM, containerSelector) => {
    // Selecciona el contenedor donde se inyectará el DOM reconstruido
    const container = document.querySelector(containerSelector);
  
    if (!container) {
      console.error(`No se encontró el contenedor con el selector: ${containerSelector}`);
      return;
    }
  
    // Limpia el contenedor de cualquier contenido previo
    container.innerHTML = '';
     
  
    // Crear el elemento raíz del miniDOM
    const rootElement = createElementFromMiniDOM(miniDOM);
    container.appendChild(rootElement);
  
    
  };
  
/*
OBJETIVO:
Aqui definimos la funcion createElementFromMiniDOM, es una funcion recursiva que
asigna los atributos eventos y estilos a cada elemento
*/
// Función recursiva para crear elementos desde miniDOM
export const createElementFromMiniDOM = (miniElement) => {
    // Crear el elemento DOM
    const element = document.createElement(miniElement.tagName);

    // Asignar atributos al elemento
    for (const [attrName, attrValue] of Object.entries(miniElement.attributes)) {
      element.setAttribute(attrName, attrValue);
    }

    // Agregar manejadores de eventos
    for (const event of miniElement.events) {
      element.addEventListener(event.type, event.handler);
    }

    // Si el miniElemento es un nodo de texto, asignar su contenido
    if (miniElement.tagName === 'TextNode') {
      element.textContent = miniElement.textContent;
    } else {
      // Agregar hijos al elemento de manera recursiva
      for (const child of miniElement.children) {
        const childElement = createElementFromMiniDOM(child);
        element.appendChild(childElement);
      }
    }
    // Crear y aplicar un elemento <style> con las reglas de estilo del miniDOM
    const styleElement = document.createElement('style');
    const cssRules = Object.values(miniElement.rules).flat().join('\n');
    styleElement.innerHTML = cssRules;
    document.head.appendChild(styleElement);

    return element;
    
  };