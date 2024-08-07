
// Función para obtener los inputs y selects creados dinámicamente y organizarlos en un objeto
export const getDynamicElements = (container: HTMLElement): { [key: string]: string } => {
  const elements: { [key: string]: string } = {};

  const inputElements = container.querySelectorAll<HTMLInputElement>('input');
  inputElements.forEach(input => {
    elements[input.name ?? input.id] = input.value;
  });

  const selectElements = container.querySelectorAll<HTMLSelectElement>('select');
  selectElements.forEach(select => {
    elements[select.name ?? select.id] = select.value;
  });

  return elements;
};

export const selectorOption = (dynamicInputsContainer: HTMLElement, generationTypeSelect: HTMLSelectElement) => () => {
  // Limpiar el contenido actual del contenedor dinámico
  dynamicInputsContainer.innerHTML = '';

  // Llamar a la función correspondiente según la opción seleccionada
  switch (generationTypeSelect.value) {
    case 'event-modal':
      addEventSetting(dynamicInputsContainer);
      break;
    case 'button-modal':
      addButtonSetting(dynamicInputsContainer);
      break;
    case 'element-inject':
      addInjectionSetting(dynamicInputsContainer);
      break;
  }
}

// Función para crear un nuevo select para la ubicación del botón
export const createButtonLocationSelect = () => {
  const select = document.createElement('select');
  select.id = `button-location-select`;
  select.name = `button-location`;
  const options = ['top-right', 'top-left', 'bottom-right', 'bottom-left'];
  Object.entries(options).forEach(([value, text]) => {
    const optionElement = document.createElement('option');
    optionElement.value = value;
    optionElement.text = text;
    select.appendChild(optionElement);
  });
  return select;
};

// Función para crear un nuevo input para el texto del botón
export const createButtonTextInput = () => {
  const input = document.createElement('input');
  input.type = 'text';
  input.id = `button-text-input`;
  input.name = `button-text`;
  input.placeholder = 'Enter button text';
  return input;
};

// Función para crear un input para el selector de elemento de inyección
export const createInjectionSelectorInput = () => {
  const input = document.createElement('input');
  input.type = 'text';
  input.id = `injection-selector-input`;
  input.name = `injection-selector`;
  input.placeholder = 'Enter element selector';
  return input;
};

// Función para crear un modal para eventos
export const createEventModal = () => {
  const eventModal = document.createElement('div');
  eventModal.className = 'odal';

  const eventModalContent = document.createElement('div');
  eventModalContent.className = 'odal-content';

  const eventModalHeader = document.createElement('div');
  eventModalHeader.className = 'odal-header';

  const eventModalBody = document.createElement('div');
  eventModalBody.className = 'odal-body';

  const eventSelectorInput = createEventSelectorInput();
  eventModalBody.appendChild(eventSelectorInput);

  const eventSelect = createEventSelect();
  eventModalBody.appendChild(eventSelect);

  eventModalContent.appendChild(eventModalHeader);
  eventModalContent.appendChild(eventModalBody);
  eventModal.appendChild(eventModalContent);

  return eventModal;
};

// Función para crear un input para el selector de evento
export const createEventSelectorInput = () => {
  const input = document.createElement('input');
  input.type = 'text';
  input.id = 'event-selector';
  input.name = 'event-selector';
  input.placeholder = 'Enter event selector';
  return input;
};

// Función para crear un select para el tipo de evento
export const createEventSelect = () => {
  const select = document.createElement('select');
  select.id = 'event-type';
  select.name = 'event-type';

  const options = [
    { value: 'click', text: 'Click' },
    { value: 'mouseover', text: 'Mouse Over' },
    { value: 'mouseout', text: 'Mouse Out' },
    { value: 'mousemove', text: 'Mouse Move' },
    { value: 'mousedown', text: 'Mouse Down' },
    { value: 'mouseup', text: 'Mouse Up' },
    { value: 'dblclick', text: 'Double Click' },
    { value: 'keydown', text: 'Key Down' },
    { value: 'keyup', text: 'Key Up' },
    { value: 'keypress', text: 'Key Press' },
    { value: 'change', text: 'Change' },
    { value: 'input', text: 'Input' },
    { value: 'submit', text: 'Submit' },
    { value: 'focus', text: 'Focus' },
    { value: 'blur', text: 'Blur' },
    { value: 'scroll', text: 'Scroll' },
    { value: 'resize', text: 'Resize' },
    { value: 'animationstart', text: 'Animation Start' },
    { value: 'animationend', text: 'Animation End' },
    { value: 'animationiteration', text: 'Animation Iteration' },
    { value: 'transitionend', text: 'Transition End' },
    { value: 'transitionstart', text: 'Transition Start' },
    { value: 'touchstart', text: 'Touch Start' },
    { value: 'touchend', text: 'Touch End' },
    { value: 'touchmove', text: 'Touch Move' },
    { value: 'touchcancel', text: 'Touch Cancel' },
    { value: 'touchenter', text: 'Touch Enter' },
    { value: 'touchleave', text: 'Touch Leave' },
    
    //...
  ];

  options.forEach((option) => {
    const optionElement = document.createElement('option');
    optionElement.value = option.value;
    optionElement.text = option.text;
    select.appendChild(optionElement);
  });

  return select;
};

// Función para agregar un nuevo elemento de configuración de evento
export const addEventSetting = (dynamicInputsContainer: HTMLElement) => {
  const eventSetting = document.createElement('div');
  eventSetting.className = 'event-setting';
  const eventModal = createEventModal();
  eventSetting.appendChild(eventModal);
  dynamicInputsContainer.appendChild(eventSetting);
};

// Función para agregar un nuevo elemento de configuración de botón
export const addButtonSetting = (dynamicInputsContainer: HTMLElement) => {
  const buttonSetting = document.createElement('div');
  buttonSetting.className = 'button-setting';
  const locationSelect = createButtonLocationSelect();
  const textInput = createButtonTextInput();
  buttonSetting.appendChild(locationSelect);
  buttonSetting.appendChild(textInput);
  dynamicInputsContainer.appendChild(buttonSetting);
};

// Función para agregar un nuevo elemento de configuración de inyección
export const addInjectionSetting = (dynamicInputsContainer: HTMLElement) => {
  const injectionSetting = document.createElement('div');
  injectionSetting.className = 'injection-setting';
  const selectorInput = createInjectionSelectorInput();
  injectionSetting.appendChild(selectorInput);
  
  const textInput = createButtonTextInput();
  dynamicInputsContainer.appendChild(textInput);
  dynamicInputsContainer.appendChild(injectionSetting);
};
