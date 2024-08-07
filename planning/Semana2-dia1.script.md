### Creacion de script para exportar la UI

### 1. Definición del Tipo de Datos

En TypeScript, definimos un nuevo tipo para representar elementos del DOM de manera simplificada y extendida. Para evitar conflictos con el tipo nativo `HTMLElement`, podemos llamar a este tipo `MiniHTMLElement`:

- **MiniHTMLElement:** Define una estructura que incluye propiedades como `tagName`, `attributes`, `children`, `styles`, `pseudoClasses`, `pseudoSelectors`, y `events`.

### 2. Función `createMiniDOM`

Esta función se encarga de crear una "mini copia" del DOM a partir de un nodo (`Element`) del DOM real. Aquí están los pasos detallados que debería seguir esta función:

- **Captura de Atributos:** Itera sobre los atributos del nodo y los añade al objeto `MiniHTMLElement`.
  
- **Recursión sobre Hijos:** Utiliza un bucle para recorrer los hijos del nodo actual de manera recursiva, creando y añadiendo mini copias de estos hijos al array `children` del objeto `MiniHTMLElement`.

- **Captura de Eventos:** Utiliza una lista de nombres de eventos predefinidos (como `click`, `mouseover`, etc.) para verificar si el nodo tiene asignado un manejador de eventos para cada uno de estos eventos. Si encuentra un manejador de evento, lo añade al array `events` del objeto `MiniHTMLElement`.

- **Captura de Estilos:** Utiliza el método `window.getComputedStyle` para obtener los estilos computados del nodo y los añade al objeto `styles` del `MiniHTMLElement`.

- **Captura de Pseudo-clases y Pseudo-selectores:** Utiliza `window.getComputedStyle` con los nombres de las pseudo-clases (`:hover`, `:active`, etc.) y pseudo-selectores (`::before`, `::after`, etc.) para capturar los estilos asociados a estos estados y los añade a los objetos `pseudoClasses` y `pseudoSelectors` del `MiniHTMLElement`.

### 3. Generación Dinámica de la Interfaz

Una vez que se tiene la mini copia del DOM (`MiniHTMLElement`), se utiliza para generar dinámicamente la interfaz de usuario. Aquí están los pasos detallados para esta tarea:

- **Creación del Elemento Raíz:** Utiliza `document.createElement` para crear un elemento en el DOM basado en el `tagName` del `MiniHTMLElement`.

- **Configuración de Atributos:** Itera sobre los atributos del `MiniHTMLElement` y utiliza `setAttribute` para asignar estos atributos al elemento recién creado.

- **Configuración de Estilos:** Utiliza `element.style.setProperty` para aplicar los estilos del `MiniHTMLElement` al elemento creado.

- **Configuración de Pseudo-clases y Pseudo-selectores:** Itera sobre los objetos `pseudoClasses` y `pseudoSelectors` del `MiniHTMLElement`. Para cada uno, genera un bloque de estilo CSS correspondiente y lo añade dinámicamente al documento usando `document.createElement('style')` y `appendChild`.

- **Configuración de Eventos:** Itera sobre el array `events` del `MiniHTMLElement`. Para cada evento, utiliza `addEventListener` para asociar el manejador de eventos al elemento creado.

- **Recursión sobre Hijos:** Utiliza recursión para generar y añadir los hijos del `MiniHTMLElement` al elemento creado. Para cada hijo, se llama a una función recursiva que sigue estos mismos pasos.
