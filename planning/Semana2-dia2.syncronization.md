### Sincroniozacion de lista en capas con DOM de cada `canvas__content`

#### 1. Función `syncCanvasWithList`

Esta función es crucial ya que sincroniza el contenido del canvas con la lista HTML. Veamos cómo funciona:

- **Parámetros**: Recibe dos parámetros:
  - `canvas`: Elemento del DOM (`HTMLElement`) que representa el `canvas__content` activo.
  - `list`: Elemento del DOM (`HTMLElement`) que representa la lista `<ul>`.

- **Observador de Mutaciones (`MutationObserver`)**: 
  - Creamos un `MutationObserver` para observar cambios en el DOM del `canvas__content` activo. Esto se hace para manejar de manera reactiva la adición y eliminación de elementos en el  `canvas__content` activo y reflejar estos cambios en la lista HTML.
  - `MutationObserver` toma una función de callback que se ejecuta cuando ocurren mutaciones en el DOM del canvas (`mutations => {...}`).

- **Configuración del Observador**:
  - `const config = { childList: true, subtree: true };`: Configuramos el observador para que observe cambios en la lista de hijos (`childList`) y en todo el subárbol (`subtree`) del  `canvas__content` activo.

- **Observación de Cambios**:
  - `observer.observe(canvas, config);`: Iniciamos la observación de mutaciones en el DOM del  `canvas__content` activo, usando la configuración `config`.

- **Inicialización de Sincronización**:
  - `syncListWithCanvas(canvas, list);`: Llamamos a `syncListWithCanvas` para sincronizar inicialmente el contenido del canvas con la lista HTML.

#### 2. Función `syncListWithCanvas`

Esta función se encarga específicamente de mantener actualizada la lista HTML con el contenido del canvas:

- **Parámetros**: Recibe dos parámetros:
  - `canvas`: Elemento del DOM (`HTMLElement`) que representa el  `canvas__content` activo.
  - `list`: Elemento del DOM (`HTMLElement`) que representa la lista `<ul>`.

- **Obtener Elementos del Canvas y de la Lista**:
  - `const canvasChildren: HTMLCollection = canvas.children;`: Obtenemos una colección de los hijos del  `canvas__content` activo y lo hacemos de manera recustiva.
  - `const listItems: NodeListOf<HTMLLIElement> = list.querySelectorAll('li');`: Obtenemos una lista de los elementos `<li>` dentro de la lista.

- **Actualizar la Lista HTML**:
  - `const existingIds: string[] = Array.from(listItems).map(li => li.getAttribute('data-id')!);`: Creamos un array con los IDs actuales de los elementos de la lista. Esto nos ayuda a saber qué elementos ya existen en la lista esto lo podemos obtener del `localStorageMannager` de la colecion de elementos agregados.

- **Eliminar Elementos No Existentes**:
  - Iteramos sobre los elementos de la lista (`listItems`). Si un elemento de la lista no existe en `canvasChildren`, lo eliminamos de la lista.

- **Agregar Nuevos Elementos**:
  - Iteramos sobre los elementos de `canvasChildren`. Si un elemento del  `canvas__content` activo no existe en la lista (`existingIds`), creamos un nuevo `<li>`, le asignamos un ID y otros atributos necesarios (como el nombre por defecto), y lo agregamos a la lista.

#### 3. Eventos de Drag and Drop

Los eventos de drag and drop permiten que los elementos de la lista sean arrastrados y soltados para cambiar su orden, lo que debe reflejarse tanto en el canvas como en la lista HTML:

- **Eventos**: 
  - `dragstart`: Se activa cuando comienza el arrastre de un elemento (`handleDragStart`).
  - `dragover`: Se activa cuando un elemento se arrastra sobre el área de soltar (`handleDragOver`).
  - `drop`: Se activa cuando se suelta un elemento arrastrado (`handleDrop`).

- **Funciones de Manejo de Eventos**:
  - `handleDragStart(event: DragEvent)`: Captura el elemento arrastrado y establece su ID como dato de arrastre.
  - `handleDragOver(event: DragEvent)`: Previene el comportamiento por defecto de permitir soltar el elemento.
  - `handleDrop(event: DragEvent)`: Maneja el evento de soltar un elemento arrastrado. Reordena los elementos en la lista HTML y llama a `syncCanvasWithList` para sincronizar el canvas con la lista actualizada.

#### 4. Inicialización

inicializamos el proceso llamando a `syncCanvasWithList()`. Esto asegura que todo el sistema esté configurado y funcione correctamente desde el inicio.
