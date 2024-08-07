# Mancii Web experience creator: Constructor de UI para Interfaces Personalizadas en Sitios Web Educativos

## Descripción del Proyecto

El proyecto Mancii es un constructor de interfaces de usuario (UI) diseñado para exportar scripts que generen interfaces personalizadas en sitios web educativos. Su objetivo es permitir a los usuarios subir imágenes y preguntas para crear experiencias de aprendizaje dinámicas e interactivas.

## Tecnologías Utilizadas

- **HTML**: Estructura básica de la interfaz de usuario.
- **Typescript**: Manipulación del DOM y gestión del estado de la aplicación utilizando funciones puras y operaciones inmutables.
- **localStorage y sessionStorage**: Almacenamiento y recuperación de datos de forma persistente o temporal en el navegador.
- **Funciones Puras**: Funciones que no modifican su entorno y siempre devuelven el mismo resultado dado el mismo conjunto de entradas.

## Principios de Desarrollo

1. **Crear Elementos en el DOM**: Utilizar `document.createElement` para crear elementos HTML de manera dinámica.
2. **Consultar Propiedades del DOM**: Utilizar métodos como `getAttribute`, `dataset`, o `getProperty` para obtener atributos y propiedades de elementos del DOM.
3. **Almacenamiento en localStorage y sessionStorage**: Utilizar `localStorage.setItem`, `localStorage.getItem`, `localStorage.removeItem` y métodos análogos para `sessionStorage` para almacenar y recuperar datos en el navegador.
4. **Operaciones Basadas en Funciones Puras**: Implementar funciones que realicen acciones específicas sin alterar directamente el estado global, favoreciendo la inmutabilidad y facilitando la gestión de estados.
5. **Actualización de Datos**: Implementar funciones que actualicen el contenido del DOM o los datos almacenados, manteniendo la inmutabilidad siempre que sea posible.
6. **Eliminación de Elementos**: Utilizar `removeChild` para eliminar elementos del DOM y métodos adecuados para limpiar localStorage o sessionStorage.

## Ejemplos Sencillos

### Crear Elementos en el DOM

```javascript
function crearElemento(tagName, textContent) {
  const element = document.createElement(tagName);
  element.textContent = textContent;
  return element;
}

const nuevoParrafo = crearElemento('p', 'Hola mundo');
document.body.appendChild(nuevoParrafo);
```

### Consultar Propiedades del DOM

```javascript
function obtenerAtributo(elemento, atributo) {
  return elemento.getAttribute(atributo);
}

const link = document.querySelector('a');
const href = obtenerAtributo(link, 'href');
console.log('El atributo href del enlace es:', href);
```

### Almacenar y Recuperar Datos del localStorage

```javascript
function guardarEnLocalStorage(clave, valor) {
  localStorage.setItem(clave, JSON.stringify(valor));
}

function obtenerDesdeLocalStorage(clave) {
  const item = localStorage.getItem(clave);
  return item ? JSON.parse(item) : null;
}

guardarEnLocalStorage('usuario', { nombre: 'Juan', edad: 30 });
const usuario = obtenerDesdeLocalStorage('usuario');
console.log('Datos del usuario:', usuario);
```

### Funciones Puras para Actualización de Datos

```javascript
function actualizarTexto(elemento, nuevoTexto) {
  const nuevoElemento = elemento.cloneNode(true);
  nuevoElemento.textContent = nuevoTexto;
  return nuevoElemento;
}

const parrafoOriginal = document.querySelector('p');
const parrafoActualizado = actualizarTexto(parrafoOriginal, 'Nuevo texto');
document.body.replaceChild(parrafoActualizado, parrafoOriginal);
```

### Eliminar Elementos del DOM

```javascript
function eliminarElemento(id) {
  const elemento = document.getElementById(id);
  if (elemento) {
    elemento.parentNode.removeChild(elemento);
  }
}

eliminarElemento('miElemento');
```

## Consideraciones Finales

- **Mantenimiento del Estado Global**: Utilizar funciones puras y enfoques de inmutabilidad ayuda a reducir errores y facilita el mantenimiento del código a medida que la aplicación crece.
- **Optimización y Rendimiento**: Implementar operaciones eficientes y aprovechar el almacenamiento local para mejorar la experiencia del usuario.

## Cosas a Investigar (Día 1)

- **Drag and Drop API Nativa**: Investigar cómo utilizar la API nativa de arrastrar y soltar para interactuar con elementos del DOM.
- **DOM Manipulation con JavaScript**: Revisar técnicas avanzadas para manipular el DOM de manera eficiente.
- **Mouse Events**: Estudiar eventos de mouse para mejorar la interactividad de la aplicación.
- **Mutation Observer**: Explorar el uso de Mutation Observer para detectar y reaccionar a cambios en el DOM.

## Notas Adicionales

- En este proyecto, no se utilizan clases; todo está basado en funciones para favorecer la inmutabilidad y el uso de funciones puras. Esto mejora la mantenibilidad y facilita la gestión del estado en la aplicación.


# instalar 
- bun
- clonar el repositorio 
-  `bunx --bun astro dev --host --env-file=./.env`