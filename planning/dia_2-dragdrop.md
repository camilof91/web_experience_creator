### Guía Técnica para Crear una Interfaz de Arrastrar y Soltar con IDs Únicos y Atributos Personalizados

#### 1. HTML: Estructura Básica
1.  Con una barra lateral (`.sidebar`) y un área de trabajo central (`.canvas`), ambos como elementos HTML normales. La barra lateral contendrá elementos arrastrables, y el canvas recibirá los elementos arrastrados.

#### 2. CSS: Estilo de la Interfaz
1. **Define los estilos en `styles`** para la disposición de la barra lateral y el canvas. Asegúrate de que la barra lateral tenga un fondo distinto y que el canvas tenga una separación clara para distinguir las áreas.

#### 3. JavaScript: Funcionalidad de Arrastrar y Soltar
1. **Generación de IDs Únicos**:
   - Utiliza `crypto.randomUUID()` para generar IDs únicos. Esta función es compatible con la mayoría de los navegadores modernos.
   - Si `crypto.randomUUID()` no está disponible, utiliza una función de respaldo que genere un ID utilizando `Math.random()`.

2. **Creación de Elementos Arrastrables**:
   - Define un conjunto de elementos con atributos específicos como `type` y genera un ID único para cada uno para esto usa estructuras de js y apartie de estas crearas los elementos HTML para posteriormente injectarlos en la ubicacion correspondiente.
   - Añade estos elementos a la barra lateral (`.sidebar__list`) con atributos `data-id` y `data-type`.
   - Crea una clase unica para los componentes arrastrables

3. **Eventos de Arrastrar y Soltar**:
   - **Arrastrar**: Agrega eventos para iniciar el arrastre (`dragstart`), estableciendo los datos del elemento (`data-id` y `data-type`).
   - **Soltar**: Implementa eventos para permitir la recepción del elemento (`dragover`) y manejar la acción de soltar (`drop`). Al soltar el elemento en el canvas, crea un nuevo elemento con la información del elemento arrastrado.

#### 4. Probar la Aplicación
1. **Verifica el Comportamiento**:
   - Asegúrate de que los elementos en la barra lateral sean arrastrables.
   - Comprueba que los elementos se puedan soltar en el canvas y que retengan su información original (`data-id` y `data-type`).

#### 5. Pasos Detallados

1. **HTML**:
   - Estructura básica con `div` para la barra lateral y el canvas.
   - En el canvas, muestra visualmente los elementos arrastrados.

2. **CSS**:
   - Estilos para `.sidebar` y `.canvas` para asegurar una separación visual clara.
   - Estilos para los elementos `.draggable` y `.dropped-element`.

3. **JavaScript**:
   - **Generación de IDs**: Implementa la función para generar IDs únicos utilizando `crypto.randomUUID()`.
   - **Creación de Elementos**: Añade elementos a la barra lateral con atributos `data-id` y `data-type`.
   - **Eventos de Arrastrar y Soltar**: Configura eventos para manejar `dragstart`, `dragover`, y `drop`.

#### 6. Mejores Prácticas
1. **Accesibilidad**:
   - Asegúrate de que los elementos arrastrables sean accesibles con el teclado.
   - Añade atributos `aria` apropiados para mejorar la accesibilidad.

2. **Compatibilidad**:
   - Prueba en varios navegadores para asegurar la compatibilidad.
   - Utiliza polyfills si es necesario para `crypto.randomUUID()`.

3. **Modularidad**:
   - Mantén tu JavaScript modular y bien organizado.
   - Considera separar las funciones en módulos si el proyecto crece.
