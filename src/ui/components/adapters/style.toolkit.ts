import { create, findOne, updateOne } from "../../core/adapters/storage/localStorageManager";

/**
 * Función para sincronizar estilos entre el elemento seleccionado y los inputs
 */
const syncStyles = (tools: HTMLElement[]) => {

  tools.forEach((input: HTMLElement) => {
    if (input instanceof HTMLInputElement || input instanceof HTMLButtonElement) { //podian ser mas tipos 
      const path = input.getAttribute('data-path');

      if (path.includes("style")) {
        const cssRule = getCssRule();
        if (cssRule) {
          const getValue = new Function('cssRule', `return cssRule.${path};`);
          const {variable, scheme, startsWith, endsWith} = input.dataset;

          if (!variable || !scheme) {
            setValueFrom(input, (getValue(cssRule) ?? input.getAttribute("placeholder") ?? ""));
          }

          if (variable && scheme) {
            const setValue = new Function('cssRule', 'value', `cssRule.${path} = value;`);
            const value = cssRule.style.getPropertyValue(`--${variable}`) ?? input.getAttribute("placeholder") ?? "";
            setValue(cssRule, scheme.replace(/\n|\s+/g, ""));
            const startParserValue = value.startsWith(startsWith) ? value.slice(startsWith.length) : value;
            const parserValue = startParserValue.endsWith(endsWith) ? startParserValue.slice(0, startParserValue.length - endsWith.length) : startParserValue;
            setValueFrom(input, parserValue);
          }
        }
      }

      if (!path.includes("style")) {
        const selectedElement = findOne("selections", {type: "element"})
  
        if (!selectedElement) return;

        const element = document.querySelector(`[id="${selectedElement.id}"]`);
        const getValue = new Function('element', `return element.${path}`);
        input.value = getValue(element);
      }
    }
  });
}

/**
 * Agrega eventos de input y change a los elementos de entrada que tienen un atributo data-path.
 */

/**
 * Manejador de eventos que se llama cuando se produce un cambio en el valor de un elemento de entrada.
 * @param {Event} event El evento que se produjo.
 */
const handleInputChange = (event: Event) => {
  const input = event.target as HTMLElement;
  const path = input.getAttribute('data-path');
  const value = (input as HTMLInputElement).value;

    const cssRule = getCssRule();
    if (cssRule) {
      cssRule.style.setProperty(path, value);
    }
}


const setCssRule = (newRule: CSSStyleRule) => {
  const selectedElement = findOne("selections", {type: "element"});
  
  if (!selectedElement) return;

  const element: HTMLElement = document.querySelector(`[id="${selectedElement.id}"]`);

  const styleElement: HTMLStyleElement = document.querySelector(`[id="${element.dataset.style}"]`);

  if (!styleElement || !styleElement.sheet) return;

  const cssRules = Array.from(styleElement.sheet.cssRules);
  let ruleFound = false;

  const newCssRules = cssRules.map(rule => {
    if (rule instanceof CSSStyleRule && rule.selectorText === newRule.selectorText) {
      ruleFound = true;
      return newRule;
    }
    return rule;
  });

  if (!ruleFound) {
    newCssRules.push(newRule);
  }

  while (styleElement.sheet.cssRules.length > 0) {
    styleElement.sheet.deleteRule(0);
  }

  styleElement.innerHTML = newCssRules.map(({cssText}) => cssText).join("\n");
};

/**
 * Función para obtener una regla CSS específica
 */
const getCssRule = (): CSSStyleRule | null => {
  
  const selectedElement = findOne("selections", {type: "element"})
  
  if (!selectedElement) return;

  const element: HTMLElement = document.querySelector(`[id="${selectedElement.id}"]`);


  const styleElement: HTMLStyleElement = document.querySelector(`[id="${element.dataset.style}"]`)
  

  if (!styleElement.sheet) return null;

  const cssRules = styleElement.sheet.cssRules;
  for (let i = 0; i < cssRules.length; i++) {
    const rule = cssRules[i];
    if (rule instanceof CSSStyleRule && rule.selectorText.includes(`[data-style="${styleElement.id}"]`)) {
      return rule;
    }
  }
  return null;
};



function reduceSizeOverTime(element: HTMLElement, duration: number): void {
  const startTime = Date.now();
  const initialWidth = element.offsetWidth;

  const interval = setInterval(() => {
    const elapsedTime = Date.now() - startTime;
    const progress = Math.min(elapsedTime / duration, 1);

    const newWidth = initialWidth * (1 - progress);

    element.style.width = `${newWidth}px`;

    if (progress === 1) {
      element.style.width = `0px`;
      clearInterval(interval);
    }
  }, 12);
}

/**
 * Agregar evento de doble clic a cada elemento del canvas
Array.from($canvas.children).forEach((child: HTMLElement) => {
 */
  export const elementSyncStylesTools = (child: HTMLElement) => () => {
    const toolsHidden = document.querySelector<HTMLElement>('.tools.aside.hidden');
    const togglerightbar = document.querySelector<HTMLElement>('.toggle-right-bar');
    /**
     * #selector-line-left,
    #selector-line-top,
    #selector-line-right,
    #selector-line-bottom */
    const selectorLineLeft = document.querySelector<HTMLElement>('#selector-line-left');
    const selectorLineTop = document.querySelector<HTMLElement>('#selector-line-top');
    const selectorLineRight = document.querySelector<HTMLElement>('#selector-line-right');
    const selectorLineBottom = document.querySelector<HTMLElement>('#selector-line-bottom');


    const {x, y, width, height} = child.getBoundingClientRect();

    const size = Math.min(selectorLineBottom.clientHeight || 100, selectorLineBottom.clientWidth  || 100);

    selectorLineLeft.style.left = `${x}px`;
    selectorLineLeft.style.top = `${y - size}px`;
    selectorLineRight.style.left = `${x + width + size}px`;
    selectorLineRight.style.top = `${y + height}px`;
    selectorLineTop.style.left = `${x - size}px`;
    selectorLineTop.style.top = `${y - (size * 2)}px`;
    selectorLineBottom.style.left = `${x + width + size}px`;
    selectorLineBottom.style.top = `${y + height }px`;

    selectorLineLeft.style.width = `${height}px`;
    selectorLineTop.style.width = `${width}px`;
    selectorLineRight.style.width = `${height}px`;
    selectorLineBottom.style.width = `${width}px`;

    
    reduceSizeOverTime(selectorLineLeft, 2000);
    reduceSizeOverTime(selectorLineRight, 2000);
    reduceSizeOverTime(selectorLineTop, 2000);
    reduceSizeOverTime(selectorLineBottom, 2000);
    
    
    
    
    //const styleElement = createStyleElementWithUUID();
    // child.setAttribute('data-style', styleElement.id);

    if (toolsHidden) {
      togglerightbar.click();
    }

    

    const isUpdated = updateOne("selections", {type: "element"}, {type: "element", id: child.id });

    if (!isUpdated) {
      create("selections", {type: "element", id: child.id})
    }


    /**
     * Iterar sobre herramientas y establecer propiedades
     
    tools.forEach((input: HTMLElement) => {
      const path = input.getAttribute('data-path');
      const value = (input as HTMLInputElement).value;

      if (path) {
        const cssRule = getCssRule(path);
        if (cssRule) {
          cssRule.style.setProperty(path, value);
        }
      }
    });
  */
    /**
     * Sincronizar estilos y activar inputs
     */
     /**
       * Selección de elementos del canvas y herramientas
       */
     const $tools = document.querySelector<HTMLDivElement>('.tools');
      
     /**
      * Array de herramientas con atributo data-path
      */
     const tools: HTMLElement[] = Array.from($tools.querySelectorAll<HTMLElement>('[data-path]'));
     
    syncStyles(tools);
  };

  const getEventFrom = (element: HTMLElement) => {
    if (element instanceof HTMLInputElement) {
      if (element.type === "checkbox" || element.type === "radio") {
        return "change";
      }
      return "input";
    }
  
    if (element instanceof HTMLTextAreaElement) {
      return "input";
    }
  
    if (element instanceof HTMLSelectElement) {
      return "change";
    }
  
    if (element instanceof HTMLButtonElement || element instanceof HTMLFormElement) {
      return "click";
    }
  
    return "input";
  };
  
  const getValueFrom = (element: HTMLElement) => {
    if (element instanceof HTMLInputElement) {
      if (element.type === "checkbox" || element.type === "radio") {
        return element.checked && element.dataset.value;
      }
      return element.value;
    }
  
    if (element instanceof HTMLTextAreaElement) {
      return element.value;
    }
  
    if (element instanceof HTMLSelectElement) {
      return element.value;
    }
  
    if (element instanceof HTMLButtonElement) {
      return element.innerText;
    }
  
    return null;
  };
  
  
  const setValueFrom = (element, value) => {
    if (element instanceof HTMLInputElement) {
      if (element.type === "checkbox" || element.type === "radio") {
        element.checked = Boolean(value);
        return;
      }
      element.value = value;
      return;
    }
  
    if (element instanceof HTMLTextAreaElement) {
      element.value = value;
      return;
    }
  
    if (element instanceof HTMLSelectElement) {
      element.value = value;
      return;
    }
  
    if (element instanceof HTMLButtonElement) {
      element.innerText = value;
      return;
    }
  
  };

export const eventsTools = (tools: HTMLElement[])=> {
    
  /**
   * Agregar evento de cambio a cada herramienta
   */
  tools.forEach((input: HTMLElement) => {
    

    input.addEventListener(getEventFrom(input), () => {
      /**
       * Verificar si hay elemento seleccionado
       */
      const path = input.getAttribute('data-path');
      const variable = input.dataset.variable;
      const scheme = input.dataset.scheme;
      const startsWith = input.dataset.startsWith;
      const endsWith = input.dataset.endsWith;
      const value = getValueFrom(input);

      if (path.includes("style")) {
        const cssRule = getCssRule();
        if (cssRule) {
          if (variable && scheme) {
            cssRule.style.setProperty(`--${variable}`, `${startsWith ?? ""}${value}${endsWith ?? ""}`);
          }

          if (!variable || !scheme) {
            const setValue = new Function('cssRule', 'value', `cssRule.${path} = value;`);
            setValue(cssRule, `${startsWith ?? ""}${value}${endsWith ?? ""}`);
          }
        }

        setCssRule(cssRule)
        console.log(cssRule)
      }

      if (!path.includes("style")) {
        const selectedElement = findOne("selections", {type: "element"})
  
        if (!selectedElement) return;

        const element = document.querySelector(`[id="${selectedElement.id}"]`);
        const setValue = new Function('element', 'value', `element.${path} = value;`);
        setValue(element, value);

      }

    });

    input.addEventListener('blur', () => {
      input.classList.remove('selected');
    });

    input.addEventListener('focus', () => {
      input.classList.add('selected');
    });
  });



}