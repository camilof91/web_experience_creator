### Guía para Ocultar y Mostrar la Barra Lateral con Transiciones CSS y Clases JavaScript

#### 1. HTML: Estructura Básica
1. Con una barra lateral  (`.sidebar` and `.tools`) y un botón para ocultar/mostrar la barra lateral y porfuiuera de esta.

#### 2. CSS: Estilo de la Interfaz
1. **Define los estilos en `<styles>`** para la disposición de la barra lateral y el canvas.
2. Utiliza `transform` y `translateX` para mover la barra lateral fuera de la pantalla cuando esté oculta en una clase para esta transformacion.

#### 3. JavaScript: Funcionalidad de Ocultar y Mostrar
1. **Funciones Puras**: Implementa funciones en `scripts` adentro de la carpeta de usecase con un archivo .ts para manejar el estado de la barra lateral sin modificar directamente el DOM.

#### 4. Probar la Aplicación
1. **Verifica el Comportamiento**: Asegúrate de que la barra lateral se oculte y muestre suavemente al hacer clic en el botón. para correrlo es lo siguiente
`bunx --bun astro dev --host --env-file=./.env`

#### 5. Pasos Detallados

1. **HTML**:
   - Estructura básica con `div` para la barra lateral y un botón para controlar la visibilidad.

2. **CSS**:
   - Estilos para `.sidebar` y `.sidebar--show`  `.tools--show`.
   - Utiliza `transform: translateX(-100%)` para mover la barra lateral fuera de la pantalla cuando está oculta.
   - Añade transiciones para crear un efecto suave al ocultar y mostrar la barra lateral.

3. **JavaScript**:
   - Define funciones puras para cambiar clases en la barra lateral (`toggleSidebar`) y manejar el estado de visibilidad sin modificar directamente el DOM.

#### 7. Mejores Prácticas

1. **Accesibilidad**:
   - Asegúrate de que el botón para ocultar/mostrar la barra lateral sea accesible.
   - Considera añadir etiquetas `aria` para mejorar la accesibilidad.

2. **Compatibilidad**:
   - Prueba en varios navegadores para asegurar la compatibilidad con `transform` y `translateX`.
   - Añade prefijos de proveedores si es necesario para compatibilidad con navegadores más antiguos.

3. **Modularidad**:
   - Divide tu JavaScript en funciones reutilizables y modulares.
   - Mantén el código limpio y bien estructurado para facilitar futuras actualizaciones y mantenimiento.
