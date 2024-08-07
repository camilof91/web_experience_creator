import { generateUniqueId } from "../../core/useCases/storage/idGeneretor";

/**
 * Genera un UUID único.
 *
 * @returns {string} Un UUID único.
 */
export const generateUUID = (): string => {
    const uuidArray = new Uint8Array(16);
    crypto.getRandomValues(uuidArray);
    return Array.prototype.map.call(uuidArray, x => (`00${x.toString(16)}`).slice(-2)).join('');
};

/**
 * Crea un elemento HTML con un UUID único.
 *
 * @param {string} tagName Nombre de la etiqueta HTML.
 * @param {string} uuid UUID único.
 * @returns {HTMLElement} El elemento HTML creado.
 */
export const createElementWithUUID = (tagName: string, uuid: string): HTMLElement => {
    const element = document.createElement(tagName);
    element.id = uuid;
    return element;
};

/**
 * Crea un elemento de estilo con un UUID único.
 *
 * @returns {HTMLStyleElement} El elemento de estilo creado.
 */
export const createStyleElementWithUUID = (): HTMLStyleElement => {
  const uuid = generateUniqueId();
  const styleElement = document.createElement('style');
  styleElement.id = uuid;
  return styleElement;
};

/**
 * Crea un atributo data-style con un UUID único.
 *
 * @param {string} styleUUID UUID único del estilo.
 * @returns {string} El atributo data-style creado.
 */
export const createDataStyleAttribute = (styleUUID: string): string => {
    return `data-style="${styleUUID}"`;
};

/**
 * Crea el contenido del estilo por defecto.
 *
 * @param {string} styleUUID UUID único del estilo.
 * @returns {string} El contenido del estilo por defecto.
 */
export const createDefaultStyleContent = (styleUUID: string): string => {
    return `[${createDataStyleAttribute(styleUUID)}] {}`;
};

/**
 * Procesa un elemento HTML y crea un estilo asociado.
 *
 * @param {HTMLElement} element El elemento HTML a procesar.
 * @returns {{ element: HTMLElement; style: HTMLStyleElement }} Un objeto con el elemento procesado y el estilo creado.
 */
export const processElement = (element: HTMLElement): { element: HTMLElement; style: HTMLStyleElement } => {
  const styleElement = createStyleElementWithUUID();
  element.setAttribute('data-style', styleElement.id);
  styleElement.innerHTML = createDefaultStyleContent(styleElement.id);
  return { element, style: styleElement };
};