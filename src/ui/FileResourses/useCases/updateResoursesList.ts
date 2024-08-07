import { openDB, addResource, getAllResources } from "../../../data/indexedDB";
import { generateUniqueId } from "../../core/useCases/storage/idGeneretor"; // Importar la función



// Enumeración de tipos de contenido
enum ContentType {
  Image = 'image',
  Video = 'video',
  Audio = 'audio',
  Text = 'text',
  PDF = 'application/pdf',
  Word = 'application/msword',
  Excel = 'application/vnd.ms-excel',
  PowerPoint = 'application/vnd.ms-powerpoint',
  OfficeDocument = 'application/vnd.openxmlformats-officedocument'
}

// Definición de tipos para ComponentCreatorUI
type BaseComponent = {
  id: string;
  type: string;
  name: string;
  text?: string;
  attributes?: Record<string, string>;
  children?: ComponentCreatorUI[];
};

type VideoComponent = BaseComponent & {
  type: "video";
  name: string;
  attributes: Record<string, string>;
  sources: { src: string; type: string; }[];
};

type AudioComponent = BaseComponent & {
  type: "audio";
  name: string;
  attributes: Record<string, string>;
  sources: { src: string; type: string; }[];
};

type IframeComponent = BaseComponent & {
  type: "iframe";
};

type CanvasComponent = BaseComponent & {
  type: "canvas";
};

type ComponentCreatorUI = BaseComponent | VideoComponent | AudioComponent | IframeComponent | CanvasComponent;

export const initializeResourceList = async () => {
  const fileInput = document.getElementById('fileInput') as HTMLInputElement;
  const resourceList = document.getElementById('resourceList') as HTMLUListElement;
  const canvas = document.getElementById('canvas') as HTMLElement;
  const db = await openDB('manciiDB', 1);

  // Función para actualizar la lista de recursos
  const updateResourceList = async () => {
    resourceList.innerHTML = ''; // Limpiar la lista antes de agregar elementos

    const resources = await getAllResources(db);
    const addedIds = new Set<string>(); // Conjunto para almacenar IDs de recursos agregados

    resources.forEach((resource, index) => {
      // Verificar si el recurso ya se ha agregado
      if (!addedIds.has(resource.id)) {
        const component = createComponentCreatorUI(resource);
        const li = document.createElement('li');
        li.classList.add('sidebar__item');
        li.textContent = `${component.type}: ${component.name}`;
        li.draggable = true;
        li.setAttribute('data-resource-content', getResourceContent(component));

        // Crear elemento adecuado y agregar atributos
        const element = createHtmlElement(component.type, component.attributes);

        resourceList.appendChild(li);

        // Agregar el ID del recurso al conjunto de IDs agregados
        addedIds.add(resource.id);
        addDragAndDropEvents(li, component);
      }
    });

  };

  // Función para crear el objeto de componente UI
  const createComponentCreatorUI = (resource: { name: string; content: any }): ComponentCreatorUI => {
    const { name, content } = resource;
    const id = generateUniqueId(); //generar UUID único
    const elementType = getElementType(content);
    const attributes = getAttributes(content);

    switch (elementType) {
      case "img":
      case "label":
      case "iframe":
        return {
          id,
          type: elementType,
          name,
          attributes
        };
      case "video":
        return {
          id,
          type: "video",
          name,
          attributes,
          sources: [{ src: content, type: content.split(';')[0].split(':')[1] }]
        };
      case "audio":
        return {
          id,
          type: "audio",
          name,
          attributes,
          sources: [{ src: content, type: content.split(';')[0].split(':')[1] }]
        };
      // case "application/msword":
      //   return {
      //     id,
      //     type: "Word",
      //     name,
      //     attributes
      //   };
      // case "application/pdf":
      //   return {
      //     id,
      //     type: "PDF",
      //     name,
      //     attributes
      //   };
      case "unknown":
      default:
        return {
          id,
          type: "unknown",
          name,
          attributes
        };
    }
  };

  // Función para obtener el tipo de elemento según el contenido
  const getElementType = (content: string): string => {
    if (content.startsWith(`data:${ContentType.Image}`)) {
      return "img";
    }
    if (content.startsWith(`data:${ContentType.Video}`)) {
      return "video";
    }
    if (content.startsWith(`data:${ContentType.Audio}`)) {
      return "audio";
    }
    if (content.startsWith(`data:${ContentType.Text}`)) {
      return "label";
    }
    if (content.startsWith(ContentType.PDF) ||
      content.startsWith(ContentType.Word) ||
      content.startsWith(ContentType.Excel) ||
      content.startsWith(ContentType.PowerPoint) ||
      content.startsWith(ContentType.OfficeDocument)) {
      return "iframe";
    }
    return "unknown";
  };

  // Función para obtener los atributos del componente según el contenido
  const getAttributes = (content: string) => {
    const attributes: Record<string, string> = {
      id: generateUniqueId(),
      src: content
    };

    if (content.startsWith(`data:${ContentType.Image}`)) {
      attributes['alt'] = content.split(',')[0].split(';')[0].split(':')[1];
    }
    if (content.startsWith(`data:${ContentType.Text}`)) {
      attributes['text'] = atob(content.split(',')[1]); // Decodificar base64
    }

    return attributes;
  };

  // Función para obtener el contenido del recurso
  const getResourceContent = (component: ComponentCreatorUI): string => {
    switch (component.type) {
      case "video":
      case "audio":
        return (component as VideoComponent | AudioComponent).sources[0].src; // Acceder a sources según el tipo
      default:
        return component.attributes?.src ?? '';
    }
  };

  // Función para agregar eventos de arrastrar y soltar a los elementos de la lista de recursos
  const addDragAndDropEvents = (item: HTMLElement,componentCreatorUI: ComponentCreatorUI) => {
      item.addEventListener('dragstart', (e) => {
        console.log(componentCreatorUI);
        
        e.dataTransfer.setData("application/json", JSON.stringify(componentCreatorUI));
        item.classList.add('dragging');
      });

      item.addEventListener('dragend', () => {
        item.classList.remove('dragging');
      });
  };

  // Agregar evento de cambio al fileInput para subir archivos
  fileInput.addEventListener('change', async (event) => {
    const files = (event.target as HTMLInputElement).files;
    if (files) {
      for (let file of files) {
        const reader = new FileReader();
        reader.onload = async (e) => {
          const result = e.target?.result;
          if (result) {
            await addResource(db, { name: file.name, content: result });
            await updateResourceList(); // Esperar a que se actualice la lista después de agregar el recurso
          }
        };
        reader.readAsDataURL(file);
      }
    }
  });

  // Llamar a updateResourceList inicialmente para cargar los recursos existentes
  await updateResourceList();

  // Función para agregar eventos de arrastrar y soltar al canvas
  canvas.addEventListener('dragover', (e) => {
    e.preventDefault();
  });

  canvas.addEventListener('drop', (e) => {
    e.preventDefault();
    const content = e.dataTransfer!.getData('text/plain');
    addToCanvas(content, canvas);
  });

  // Función para agregar un elemento al canvas
  const addToCanvas = (content: string, canvas: HTMLElement) => {
    const component = createComponentCreatorUI({ name: '', content });
    const element = createHtmlElement(component.type, component.attributes);

    canvas.appendChild(element);
  };

};

// Función para crear un elemento HTML con atributos
const createHtmlElement = (elementType: string, attributes: Record<string, string>) => {
  const element = document.createElement(elementType);
  Object.keys(attributes).forEach(key => {
    element.setAttribute(key, attributes[key]);
  });
  return element;
};
