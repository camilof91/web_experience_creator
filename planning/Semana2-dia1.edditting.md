### edditar el elemento seleccionado 
#### 1. Diseño de la Interfaz de Usuario

1. **Estructura del HTML:**
   - Define un contenedor principal (`.canvas__content--active`) que contendrá los elementos que se pueden seleccionar.
   - Crea un contenedor (`.tools`) que contendrá los inputs para editar las propiedades de los elementos seleccionados.

2. **Definición de Inputs:**
   - Cada input debe tener un atributo `data-path` que especifique la propiedad del elemento que representa ejemplo `data-path="style.top"`.
   - Algunos inputs pueden tener un atributo `data-handler` para manejar valores especiales `data-handler="(path, value) => findOne("tools", { identifier: path })['value'] + findOne("tools", { identifier: path })['unit']"`.

#### 2. Sincronización de Datos

1. **Detección de Doble Clic:**
   - Añade un event listener para detectar doble clic en los elementos hijos o subhijos de `.canvas__content--active`.

2. **Selección del Elemento:**
   - Al hacer doble clic en un elemento, captura su referencia y sus propiedades usando el `localStorageMannager`.

3. **Actualización de Inputs:**
   - Implementa una función para recorrer los inputs y actualizar sus valores según las propiedades del elemento seleccionado.
   - Utiliza el atributo `data-path` para determinar la propiedad correspondiente y actializalas siempre en el  `localStorageMannager` usando el create en la collection de `tools`.

4. **Manejadores Especiales:**
   - Define funciones específicas para los inputs con `data-handler` que necesiten procesamiento adicional (por ejemplo, conversión de unidades).

#### 3. Edición en Tiempo Real

1. **Eventos de Input:**
   - Añade event listeners a los inputs para detectar cambios.
   - Al cambiar un input, actualiza inmediatamente la propiedad correspondiente del elemento seleccionado.

2. **Actualización del Elemento:**
   - Implementa una función para actualizar las propiedades del elemento en tiempo real según los cambios en los inputs usando .
   - Utiliza el atributo `data-path` para determinar la propiedad que debe actualizarse.

#### 4. Guardado de Cambios

1. **Botón de Guardar:**
   - Añade un botón de guardar en la interfaz.
   - Al hacer clic en el botón, guarda los cambios en `localStorage` utilizando la función `updateOne`.

#### 5. Edge Cases y Pruebas

1. **Edge Cases:**
   - Maneja casos donde el elemento seleccionado no tenga todas las propiedades definidas en los inputs.
   - Asegúrate de que los inputs se actualicen correctamente cuando se seleccionen diferentes elementos rápidamente.
   - Maneja casos donde se cambian valores a formatos incorrectos (por ejemplo, texto en lugar de números).

2. **Pruebas:**
   - Realiza pruebas exhaustivas de la funcionalidad de edición y sincronización.
   - Verifica que los cambios se reflejan en `localStorage` correctamente.

### Detalle 

#### 1. Sincronización de Datos

1. **Event Listener para Doble Clic:**
   - Añade un event listener en `document` que detecte doble clics en elementos dentro de `.canvas__content--active`.

2. **Función para Seleccionar el Elemento:**
   - Captura el elemento y sus propiedades al hacer doble clic.
   - Actualiza una variable `currentElement` con la referencia al elemento seleccionado.

3. **Función para Actualizar Inputs:**
   - Implementa una función `updateInputsFromElement` que recorra los inputs y actualice sus valores según las propiedades del elemento seleccionado.
   - Utiliza `data-path` para acceder a las propiedades del elemento.
   - Si un input tiene `data-handler`, llama a la función correspondiente para procesar el valor antes de asignarlo.

4. **Manejadores Especiales:**
   - Define funciones adicionales (por ejemplo, `sizeHandler`) para inputs con `data-handler` que necesiten procesamiento adicional.

#### 2. Edición en Tiempo Real

1. **Event Listeners en Inputs:**
   - Añade event listeners a los inputs para detectar cambios.
   - Al cambiar un input, llama a una función `updateElementFromInputs` para actualizar las propiedades del elemento en tiempo real.

2. **Función para Actualizar Propiedades:**
   - Implementa una función `updateElementFromInputs` que recorra los inputs, lea sus valores y actualice las propiedades correspondientes del `currentElement`.
   - Utiliza `data-path` para determinar la propiedad que debe actualizarse.
   - Si un input tiene `data-handler`, llama a la función correspondiente para procesar el valor antes de asignarlo.

#### 3. Guardado de Cambios

1. **Botón de Guardar:**
   - Añade un botón de guardar y un event listener que llame a la función `updateOne` para guardar los cambios en `localStorage`.

#### 4. Edge Cases y Pruebas

1. **Manejo de Casos Especiales:**
   - Implementa lógica para manejar elementos sin todas las propiedades definidas.
   - Asegúrate de que los inputs se actualicen correctamente cuando se seleccionen diferentes elementos rápidamente.
   - Maneja casos donde se cambian valores a formatos incorrectos (por ejemplo, texto en lugar de números).

2. **Pruebas Exhaustivas:**
   - Realiza pruebas para asegurarte de que todos los casos funcionan correctamente.

### Desglose por Funcionalidad

#### Detección de Doble Clic

1. **Añadir Event Listener:**
   - En el archivo `app.js`, añade un event listener para detectar doble clics en elementos hijos o subhijos de `.canvas__content--active`.
   - Al hacer doble clic, captura la referencia del elemento y sus propiedades.

#### Selección y Sincronización del Elemento

1. **Captura del Elemento:**
   - Define una variable `currentElement` para almacenar la referencia al elemento seleccionado.

2. **Actualización de Inputs:**
   - Implementa una función `updateInputsFromElement` que recorra todos los inputs con `data-path` y actualice sus valores según las propiedades del `currentElement`.

#### Manejadores Especiales

1. **Definir Funciones de Manejadores:**
   - Define funciones específicas para inputs con `data-handler` que necesiten procesamiento adicional (por ejemplo, `sizeHandler`).

#### Edición en Tiempo Real

1. **Añadir Event Listeners a Inputs:**
   - Añade event listeners a todos los inputs para detectar cambios.
   - Al cambiar un input, llama a `updateElementFromInputs` para actualizar las propiedades del `currentElement` en tiempo real.

2. **Actualizar Propiedades:**
   - Implementa una función `updateElementFromInputs` que recorra los inputs, lea sus valores y actualice las propiedades del `currentElement`.

#### Guardado de Cambios

1. **Añadir Botón de Guardar:**
   - Añade un botón de guardar en el HTML.
   - Añade un event listener al botón que llame a la función `updateOne` para guardar los cambios en `localStorage`.

#### Edge Cases y Pruebas

1. **Manejo de Casos Especiales:**
   - Asegúrate de manejar correctamente los elementos que no tienen todas las propiedades definidas.
   - Asegúrate de que los inputs se actualicen correctamente al seleccionar diferentes elementos rápidamente.

2. **Pruebas Exhaustivas:**
   - Realiza pruebas para verificar que todos los casos funcionen correctamente y que los cambios se reflejen en `localStorage`.

### Resumen de Funciones Principales

1. **updateInputsFromElement:**
   - Actualiza los inputs con las propiedades del `currentElement`.

2. **updateElementFromInputs:**
   - Actualiza las propiedades del `currentElement` según los valores de los inputs.

3. **sizeHandler (ejemplo de manejador especial):**
   - Procesa el valor de un input antes de asignarlo a la propiedad correspondiente.
