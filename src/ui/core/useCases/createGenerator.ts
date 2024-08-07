import type { MiniHTMLElement } from '../useCases/scriptBuilder';
import { createElementFromMiniDOM, restoreDOM } from '../useCases/restoreFunctions';
import { getDynamicElements } from './generatorPlugin';



// Función para generar el código basado en los valores de los inputs
export const generateDynamicCode = (dynamicElements: { [key: string]: string }): string => {
  let dynamicCode = '';

  switch (dynamicElements.type) {
    case 'event-modal':
      dynamicCode = `
        document.querySelector('${dynamicElements['event-selector']}').addEventListener('${dynamicElements['event-type']}', () => {
          restoreDOM(miniDom, "body");
        });
      `;
      break;
    case 'button-modal':
      dynamicCode = `
        const button = document.createElement('button');
        button.innerText = '${dynamicElements['button-text']}';
        button.style.position = 'fixed';
        button.style.${dynamicElements['button-location'].split('-')[0]} = '10px';
        button.style.${dynamicElements['button-location'].split('-')[1]} = '10px';
        document.body.appendChild(button);
        button.addEventListener('click', () => {
          restoreDOM(miniDom, "body");
        });
      `;
      break;
    case 'element-inject':
      dynamicCode = `
        const element = document.querySelector('${dynamicElements['injection-selector']}');
        if (element) {
          const injectContent = document.createElement('div');
          injectContent.innerText = 'Contenido inyectado';
          element.appendChild(injectContent);
          // Ejecutar restoreDOM cuando sea necesario en el contexto del elemento inyectado
          restoreDOM(miniDom, ${dynamicElements['injection-selector']});
        }
      `;
      break;
  }

  return dynamicCode;
};


/*
OBJETIVO:
Aqui se define la funcion handleMiniDOMSerialization, esta funcion serializamos el miniDOM
para convertilo en un JSON, cuando hacemos click en el boton de la pagina para descargar el script
esta funcion es la encargada de serializar y generar el archivo con todos los elementos.
*/
export const handleMiniDOMSerialization = (miniDOM: MiniHTMLElement) => {
  const serializedMiniDOM = JSON.stringify(miniDOM, null, 2);


  //plugin-generator-fieldset
  const fileInput = document.getElementById('plugin-generator-fieldset') as HTMLInputElement;

  const dynamicElements = getDynamicElements(fileInput);

  const generatedCode = generateDynamicCode(dynamicElements);

  const fileContent = /*jsx*/ `
    const miniDom = ${serializedMiniDOM};
    //aqui va la funcion de la guia,  lo que haga aqui, sera Javascript, aqui no hay tipado.
    const createElementFromMiniDOM = ${createElementFromMiniDOM.toString()}
    const restoreDOM = ${restoreDOM.toString()}
    ${generatedCode}
    `;
  const blob = new Blob([fileContent], { type: 'application/javascript' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'experience_plugin_mancii.js';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
