
import type { ComponentCreatorUI } from "../schema/schema";

export const componentsCreators: ComponentCreatorUI[] = [
  {
    id: crypto.randomUUID(),
    type: "input",
    name: "Texto",
    text: "",
    attributes: { type: "text", id: crypto.randomUUID() }
  },
  {
    id: crypto.randomUUID(),
    type: "input",
    name: "Check",
    text: "",
    attributes: { type: "checkbox", id: crypto.randomUUID() }
  },
  {
    id: crypto.randomUUID(),
    type: "input",
    name: "Radio",
    text: "",
    attributes: { type: "radio", id: crypto.randomUUID(), name: "radioGroup" }
  },
  {
    id: crypto.randomUUID(),
    type: "input",
    name: "Fecha",
    text: "",
    attributes: { type: "date", id: crypto.randomUUID() }
  },
  {
    id: crypto.randomUUID(),
    type: "input",
    name: "Email",
    text: "",
    attributes: { type: "email", id: crypto.randomUUID(), placeholder: "nombre@ejemplo.com" }
  },
  {
    id: crypto.randomUUID(),
    type: "input",
    name: "Contraseña",
    text: "",
    attributes: { type: "password", id: crypto.randomUUID(), placeholder: "Contraseña segura" }
  },
  {
    id: crypto.randomUUID(),
    type: "div",
    name: "Box",
    text: "Contenido del div",
    attributes: { contentEditable: "true", id: crypto.randomUUID() }
  },
  {
    id: crypto.randomUUID(),
    type: "span",
    name: "Span",
    text: "Contenido del span",
    attributes: { id: crypto.randomUUID(), style: "font-weight: bold;" }
  },
  {
    id: crypto.randomUUID(),
    type: "p",
    name: "Párrafo",
    text: "Texto del párrafo",
    attributes: { id: crypto.randomUUID() }
  },
  {
    id: crypto.randomUUID(),
    type: "h1",
    name: "Encabezado H1",
    text: "Título H1",
    attributes: { id: crypto.randomUUID() }
  },
  {
    id: crypto.randomUUID(),
    type: "h2",
    name: "Encabezado H2",
    text: "Título H2",
    attributes: { id: crypto.randomUUID() }
  },
  {
    id: crypto.randomUUID(),
    type: "h3",
    name: "Encabezado H3",
    text: "Título H3",
    attributes: { id: crypto.randomUUID() }
  },
  {
    id: crypto.randomUUID(),
    type: "h4",
    name: "Encabezado H4",
    text: "Título H4",
    attributes: { id: crypto.randomUUID() }
  },
  {
    id: crypto.randomUUID(),
    type: "h5",
    name: "Encabezado H5",
    text: "Título H5",
    attributes: { id: crypto.randomUUID() }
  },
  {
    id: crypto.randomUUID(),
    type: "h6",
    name: "Encabezado H6",
    text: "Título H6",
    attributes: { id: crypto.randomUUID() }
  },
  {
    id: crypto.randomUUID(),
    type: "ul",
    name: "Unordered List",
    text: "",
    attributes: { id: crypto.randomUUID() },
    children: [
      {
        id: crypto.randomUUID(),
        type: "li",
        name: "List Item 1",
        text: "Item 1",
        attributes: { id: crypto.randomUUID() }
      },
      {
        id: crypto.randomUUID(),
        type: "li",
        name: "List Item 2",
        text: "Item 2",
        attributes: { id: crypto.randomUUID() }
      }
    ]
  },
  {
    id: crypto.randomUUID(),
    type: "ol",
    name: "Ordered List",
    text: "",
    attributes: { id: crypto.randomUUID() },
    children: [
      {
        id: crypto.randomUUID(),
        type: "li",
        name: "List Item 1",
        text: "Item 1",
        attributes: { id: crypto.randomUUID() }
      },
      {
        id: crypto.randomUUID(),
        type: "li",
        name: "List Item 2",
        text: "Item 2",
        attributes: { id: crypto.randomUUID() }
      }
    ]
  },
  {
    id: crypto.randomUUID(),
    type: "img",
    name: "Imagen",
    text: "",
    attributes: { id: crypto.randomUUID(), src: "path_to_image.jpg", alt: "Descripción de la imagen", style: "max-width: 100%;" }
  },
  {
    id: crypto.randomUUID(),
    type: "video",
    name: "Video",
    text: "",
    attributes: {
      id: crypto.randomUUID(),
      width: "320",
      height: "240",
      controls: "true"
    },
    children: [
      {
        id: crypto.randomUUID(),
        type: "source",
        name: "Video MP4",
        attributes: { src: "video.mp4", type: "video/mp4" }
      },
      {
        id: crypto.randomUUID(),
        type: "source",
        name: "Video WEBM",
        attributes: { src: "video.webm", type: "video/webm" }
      }
    ]
  },
  {
    id: crypto.randomUUID(),
    type: "audio",
    name: "Audio",
    text: "",
    attributes: {
      id: crypto.randomUUID(),
      controls: "true"
    },
    children: [
      {
        id: crypto.randomUUID(),
        type: "source",
        name: "Audio MP3",
        attributes: { src: "audio.mp3", type: "audio/mp3" }
      },
      {
        id: crypto.randomUUID(),
        type: "source",
        name: "Audio OGG",
        attributes: { src: "audio.ogg", type: "audio/ogg" }
      }
    ]
  },
  {
    id: crypto.randomUUID(),
    type: "iframe",
    name: "iFrame",
    text: "",
    attributes: {
      id: crypto.randomUUID(),
      src: "https://mancii.com/",
      width: "320",
      height: "240"
    }
  },
  {
    id: crypto.randomUUID(),
    type: "canvas",
    name: "Canvas",
    text: "",
    attributes: {
      id: crypto.randomUUID(),
      width: "800",
      height: "600"
    }
  },
  {
    id: crypto.randomUUID(),
    type: "a",
    name: "Enlace",
    text: "Texto del enlace",
    attributes: {
      id: crypto.randomUUID(),
      href: "https://mancii.com",
      target: "_blank",
      rel: "noopener noreferrer"
    }
  },
  {
    id: crypto.randomUUID(),
    type: "nav",
    name: "Navegación",
    text: "",
    attributes: { id: crypto.randomUUID() },
    children: [
      {
        id: crypto.randomUUID(),
        type: "a",
        name: "NavLink1",
        text: "Enlace 1",
        attributes: { id: crypto.randomUUID(), href: "#enlace1" }
      },
      {
        id: crypto.randomUUID(),
        type: "a",
        name: "NavLink2",
        text: "Enlace 2",
        attributes: { id: crypto.randomUUID(), href: "#enlace2" }
      }
    ]
  },
  {
    id: crypto.randomUUID(),
    type: "fieldset",
    name: "Fieldset",
    text: "",
    attributes: { id: crypto.randomUUID() },
    children: [
      {
        id: crypto.randomUUID(),
        type: "legend",
        name: "Legend",
        text: "Título del grupo de campos",
        attributes: { id: crypto.randomUUID() }
      },
      {
        id: crypto.randomUUID(),
        type: "input",
        name: "Texto",
        text: "",
        attributes: { type: "text", id: crypto.randomUUID(), placeholder: "Ingrese texto" }
      },
      {
        id: crypto.randomUUID(),
        type: "input",
        name: "Check",
        text: "",
        attributes: { type: "checkbox", id: crypto.randomUUID() }
      }
    ]
  },
  {
    id: crypto.randomUUID(),
    type: "datalist",
    name: "Datalist",
    text: "",
    attributes: { id: crypto.randomUUID() },
    children: [
      {
        id: crypto.randomUUID(),
        type: "option",
        name: "Opción 1",
        text: "Opción 1",
        attributes: { value: "opcion1" }
      },
      {
        id: crypto.randomUUID(),
        type: "option",
        name: "Opción 2",
        text: "Opción 2",
        attributes: { value: "opcion2" }
      }
    ]
  },
  {
    id: crypto.randomUUID(),
    type: "svg",
    name: "SVG",
    text: "",
    attributes: {
      id: crypto.randomUUID(),
      width: "100",
      height: "100",
      viewBox: "0 0 100 100",
      xmlns: "http://www.w3.org/2000/svg"
    },
    children: [
      {
        id: crypto.randomUUID(),
        type: "circle",
        name: "Circle",
        text: "",
        attributes: {
          cx: "50",
          cy: "50",
          r: "40",
          stroke: "black",
          "stroke-width": "3",
          fill: "red"
        }
      },
      {
        id: crypto.randomUUID(),
        type: "rect",
        name: "Rectangle",
        text: "",
        attributes: {
          x: "10",
          y: "10",
          width: "30",
          height: "30",
          stroke: "blue",
          "stroke-width": "2",
          fill: "yellow"
        }
      },
      {
        id: crypto.randomUUID(),
        type: "path",
        name: "Path",
        text: "",
        attributes: {
          d: "M 10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80",
          stroke: "green",
          "stroke-width": "2",
          fill: "none"
        }
      }
    ]
  }
];
