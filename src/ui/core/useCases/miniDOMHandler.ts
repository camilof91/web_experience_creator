import {
  type MiniHTMLElement,
  type CSSRules,
} from './scriptBuilder';


/*
Objetivo:
createMiniDOM es un contructor de objetos "miniHTMLElement" simplificados
a partir de un elemento DOM real "HTMLElement".
Su propósito es encapsular la lógica para crear una representación
estructurada y simplificada de un elemento del DOM
que luego será usada para generación dinámica de UI.
- createMiniDOM es una funcion recursiva a traves de captureChildren
*/
export const createMiniDOM = (currentElement: HTMLElement): MiniHTMLElement => {
  const miniElement: MiniHTMLElement = initializeMiniHTMLElement(currentElement);

  // Capturar atributos del elemento actual
  captureAttributes(currentElement, miniElement);

  
  // Capturar hijos
  captureChildren(currentElement, miniElement, createMiniDOM);

  // Capturar eventos
  captureAllEvents(currentElement, miniElement);
  // Obtener reglas CSS asociadas al estilo del elemento
  miniElement.rules = getCSSRulesFromStyle(miniElement.styleId);

  return miniElement;
};



/*
Objetivo:
Al llamar esta función initializeMiniHTMLElement, se obtiene un objeto
básico inicializado con estructuras vacías o valores por defecto para cada
propiedad del MiniHTMLElement.
Este objeto luego se utiliza como punto de partida para llenarlo con datos
más detallados durante el proceso de captura de información.
*/
const initializeMiniHTMLElement = (currentElement: HTMLElement): MiniHTMLElement => ({
  tagName: currentElement.tagName.toLowerCase(),
  attributes: {},
  children: [],
  styles: {},
  events: [],
  className: {},
  rules: {},
  styleId: currentElement.dataset.style,
  textContent: "",
});


const cssRulesObject: CSSRules = {
  "@keyframes": [],
  "@media": [],
  "@font-face": [],
  "@import": [],
  "@supports": [],
  "clases": []
};

// Estado: ruleTypeMap mapea constructores de reglas CSS a sus respectivas claves en el objeto cssRulesObject.
const ruleTypeMap = new Map<Function, string>([
  [CSSMediaRule, "@media"],
  [CSSKeyframesRule, "@keyframes"],
  [CSSFontFaceRule, "@font-face"],
  [CSSImportRule, "@import"],
  [CSSSupportsRule, "@supports"]
]);  


/*
Objtivo:
Esta función captureAttributes copia todos los atributos de un elemento HTML "currentElement"
al objeto miniElement. Esto se logra con la iteración sobre la lista de atributos
del elemento actual y copiando cada nombre de atributo y su correspondiente valor.
*/
// hacer un if si attr.name es igual a contenteditable (contentEditable) debe continuar.
const captureAttributes = (currentElement: HTMLElement, miniElement: MiniHTMLElement) => {
  for (let i = 0; i < currentElement.attributes.length; i++) {
    const attr = currentElement.attributes[i];

    if (attr.name.toLowerCase() === "contentEditable") {
      continue;
    }
    miniElement.attributes[attr.name] = attr.value;
  }
};

/*
Objetivo:
La funcion escapeForQuerySelector se utiliza para escapar caracteres
especiales en los identificadores.

*/
const escapeForQuerySelector = (id: string): string => {
    if (typeof id !== 'string') {
        throw new Error(`El ID no es una cadena válida: ${id}`);
      }
    return id.replace(/([#;&,.+*~':"!^$[\]()=>|/@])/g, '\\$1');
  };
  
  const getCSSRulesFromStyle = (styleId: string): CSSRules => {
    if (!styleId) {
        console.warn('El ID del estilo es undefined o null.');
        return {};
      }
    // Utiliza el id escapado para el selector
    const escapedId = escapeForQuerySelector(styleId);
    const styleElement = document.querySelector<HTMLStyleElement>(`[id="${escapedId}"]`);
    
    // Asegúrate de definir cssRulesObject y ruleTypeMap correctamente
    const cssRulesObject: CSSRules = {
      clases: [], 
    };
  
    const ruleTypeMap = new Map<Function, keyof CSSRules>([
      // Mapeo de constructores de reglas a nombres de propiedades en cssRulesObject
      // Ejemplo: [CSSStyleRule, 'clases']
    ]);
  
    if (!styleElement) {
      console.warn(`No se encontró la etiqueta <style> con ID: ${styleId}`);
      return cssRulesObject;
    }
  
    for (const rule of Array.from(styleElement.sheet.cssRules)) {
      if (ruleTypeMap.has(rule.constructor)) {
        const ruleConstructor = ruleTypeMap.get(rule.constructor);
        cssRulesObject[ruleConstructor]?.push(rule.cssText);
      } else {
        cssRulesObject.clases?.push(rule.cssText);
      }
    }
    return cssRulesObject;
  };
  

/*
Objetivo:
La funcion captureAllEvents captura dinamicamente todos los eventos disponibles asociados
a un elementto HTML, y almacena la inforacion relavente.
Esto se logra iterando sobre todas las propiedades del currentElement para identificar
aquellas que son manejadores de eventos y registrando cada evento junto con su respectivo
tipo y manejador en el array events
-Tener encuenta que aun en la pagina no hay eventos a capturar, por lo que aun no se prueba esta funcion,
 es importante poner a prueba esta funcion en diferentes escenarios tales como multiples eventos del mismo
 tipo, que el objeto tenga key correctas y no las que empiezan por on
*/
const captureAllEvents = (currentElement: HTMLElement, miniElement: MiniHTMLElement) => {
  const eventKeys = Object.keys(currentElement) as (keyof HTMLElementEventMap)[];

  eventKeys.forEach(eventType => {
      const eventHandler = currentElement[eventType];

      if (typeof eventHandler === 'function') {
          miniElement.events.push({
              type: eventType,
              handler: () => {
                  currentElement.addEventListener(eventType, (event: Event) => {
                      eventHandler(event);
                  });
              }
          });
      }
  });
};


/*
Objetivo:
la función captureChildren recorre todos los hijos de un elemento HTML 
generar una representación simplificada de cada hijo utilizando la función createMiniDOM,
y almacenar estas representaciones dentro del objeto miniElement de tipo MiniHTMLElement.
*/

const captureChildren = (currentElement: HTMLElement, miniElement: MiniHTMLElement, createMiniDOM) => {
  for (let i = 0; i < currentElement.childNodes.length; i++) {
    const childNode = currentElement.childNodes[i];
    
    if (childNode instanceof HTMLElement) {
        // Si es un HTMLElement, crear un mini elemento recursivamente
        const miniChild = createMiniDOM(childNode);
        miniElement.children.push(miniChild);
    } else if (childNode instanceof Text) {
        // Si es un nodo de texto, crear un mini elemento con tagName "TextNode"
        miniElement.children.push({
            tagName: "TextNode",
            attributes: {},
            children: [],
            styles: {},
            events: [],
            className: {},
            rules: {},
            styleId: "",
            textContent: childNode.textContent?.trim() || ""
        });
    }
}
};
