# README: Guía Técnica para Implementar Funcionalidad de Arrastrar y Soltar con Datos desde `data-config`

Este documento proporciona una guía técnica para implementar una interfaz de usuario que permite arrastrar y soltar elementos desde una barra lateral a un área de trabajo (canvas), utilizando datos almacenados en `sessionStorage`.

## 1. Estructura Básica del HTML
- Crea una estructura básica de HTML con una barra lateral (`.sidebar`) y un área de trabajo central (`.canvas`).

## 2. Estilo de la Interfaz en CSS
- Define los estilos para la barra lateral y el canvas en un archivo `styles.css` para asegurar una clara separación visual.
- Asegúrate de que la barra lateral tenga un fondo distinto y que el canvas tenga una separación clara para distinguir las áreas.
- Establece estilos específicos para los elementos arrastrables (`.draggable`) y para los elementos que se sueltan en el canvas (`.dropped-element`).

## 3. Funcionalidad de Arrastrar y Soltar en JavaScript

### Generación de IDs Únicos
- Utiliza `crypto.randomUUID()` para generar IDs únicos. Esta función es compatible con la mayoría de los navegadores modernos.
- Si `crypto.randomUUID()` no está disponible, utiliza una función de respaldo que genere un ID utilizando `Math.random()`.

### Creación de Elementos Arrastrables
- Define un conjunto de elementos con atributos específicos como `type` y genera un ID único para cada uno.
- Añade estos elementos a la barra lateral (`.sidebar__list`) con atributos `data-id` y `data-config`.
- Asegúrate de que los elementos tengan la clase adecuada para ser identificados como arrastrables.

### Eventos de Arrastrar y Soltar

#### Arrastrar
- Agrega un evento para iniciar el arrastre (`dragstart`), estableciendo los datos del elemento en `sessionStorage`. 
- Los datos deben incluir el `data-id`, `data-config`, y cualquier otro atributo relevante, como `data-config`.

#### Soltar
- Implementa un evento para permitir la recepción del elemento (`dragover`) y manejar la acción de soltar (`drop`) en el canvas.
- Al soltar el elemento en el canvas, recupera la información del elemento arrastrado desde `sessionStorage` y crea un nuevo elemento con estos datos. 

### Crear Función para Insertar el Elemento en el Canvas
- Define una función para crear un nuevo elemento HTML utilizando los datos almacenados en `sessionStorage`.
- Esta función debe leer los atributos necesarios desde `data-config` y construir el elemento HTML correspondiente.

## Detalles del Drop y Creación del Nuevo Elemento

1. **Evento `dragstart`**:
   - Al iniciar el arrastre, guarda en `sessionStorage` los datos del elemento, incluyendo `data-id`, y `data-config`.

2. **Evento `dragover`**:
   - Permite la recepción del elemento arrastrado.

3. **Evento `drop`**:
   - Al soltar el elemento en el canvas, recupera los datos almacenados en `sessionStorage`.
   - Llama a una función específica que creará y añadirá el nuevo elemento HTML al canvas.

### Implementación Detallada del Evento `drop`

- **Recuperación de Datos**: 
  Al iniciar el evento `drop`, recupera los datos del elemento desde `sessionStorage`.

- **Creación del Elemento**: 
  Llama a una función que creará un nuevo elemento HTML utilizando los datos recuperados. Esta función debe manejar `data-config` para establecer los atributos y contenido del nuevo elemento.

- **Inserción en el Canvas**: 
  Inserta el nuevo elemento en el canvas o en el elemento hijo del canvas correspondiente.

## Ejemplo de la Lógica de Creación del Elemento

### Función para Crear Elemento HTML
- Define una función que toma los datos del elemento (incluyendo `data-config`) y devuelve un nuevo elemento HTML listo para ser añadido al canvas.

### Pasos Generales para la Función:
1. **Crear un Contenedor**: 
   Crea un nuevo contenedor HTML (por ejemplo, un `div`).

2. **Aplicar Configuración**: 
   Utiliza los datos de `data-config` para aplicar estilos, establecer contenido, y configurar atributos del nuevo elemento.

3. **Añadir al Canvas**: 
   Inserta el contenedor configurado en el canvas en la posición adecuada.

## 4. Probar la Aplicación

### Verificar el Comportamiento
- Asegúrate de que los elementos en la barra lateral sean arrastrables.
- Comprueba que los elementos se puedan soltar en el canvas y que retengan su información original (`data-id`, y `data-config`).

## 5. Mejores Prácticas

### Accesibilidad
- Asegúrate de que los elementos arrastrables sean accesibles con el teclado.
- Añade atributos `aria` apropiados para mejorar la accesibilidad.

### Compatibilidad
- Prueba en varios navegadores para asegurar la compatibilidad.
- Utiliza polyfills si es necesario para `crypto.randomUUID()`.

### Modularidad
- Mantén tu JavaScript modular y bien organizado.
- Considera separar las funciones en módulos si el proyecto crece.
