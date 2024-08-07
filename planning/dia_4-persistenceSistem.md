# Guía Técnica para Crear un Sistema de Almacenamiento en LocalStorage Basado en Inmutabilidad

En este sistema, se manejan colecciones y documentos, y las colecciones son inmutables, es decir, cada vez que se agrega un nuevo documento, se crea una nueva versión de la colección.

## 1. Conceptos Básicos

### Colecciones y Documentos
- **Colección**: Un conjunto de documentos almacenados bajo una clave en `localStorage`.
- **Documento**: Un objeto JSON que representa una unidad de datos dentro de una colección.

### Inmutabilidad
- Las colecciones son inmutables: cada vez que se agrega un nuevo documento, se crea una nueva versión de la colección.

## 2. Estructura del Sistema

### Crear o Actualizar Colección
- Al agregar un nuevo documento a una colección, primero verifica si la colección existe en `localStorage`.
- Si la colección no existe, créala.
- Si la colección existe, crea una nueva versión con el nuevo documento añadido.

### Funciones de Consulta y Actualización
- **create**: Crea una nueva colección o añade un documento a una colección existente de manera inmutable.
- **findOne**: Busca un documento en una colección según un criterio específico.
- **findMany**: Busca múltiples documentos en una colección según un criterio.
- **updateOne**: Actualiza un solo documento en una colección.
- **updateMany**: Actualiza múltiples documentos en una colección.

## 3. Implementación Detallada

### Paso 1: Crear la Colección en LocalStorage

#### Verificar Existencia
- Utiliza `localStorage.getItem(nombreColeccion)` para verificar si la colección ya existe.
- Si el resultado es `null`, la colección no existe.

#### Crear Nueva Colección
- Si la colección no existe, utiliza `localStorage.setItem(nombreColeccion, JSON.stringify([]))` para crear una nueva colección con un arreglo vacío.

### Paso 2: Agregar un Nuevo Documento a la Colección

#### Recuperar la Colección Actual
- Utiliza `localStorage.getItem(nombreColeccion)` para obtener la colección actual.
- Parsea la colección utilizando `JSON.parse(coleccion)`.

#### Crear una Nueva Versión de la Colección
- Añade el nuevo documento al arreglo de la colección.
- Usa `localStorage.setItem(nombreColeccion, JSON.stringify(nuevaColeccion))` para guardar la nueva versión de la colección.

### Paso 3: Definir Funciones de Consulta y Actualización

#### Función `create`
1. **Parámetros**: `nombreColeccion`, `documento`.
2. **Verificación y Creación**:
   - Verifica si la colección existe.
   - Si no existe, créala.
   - Si existe, recupera la colección actual, añade el nuevo documento y guarda la nueva colección en `localStorage`.

#### Función `findOne`
1. **Parámetros**: `nombreColeccion`, `criterio`.
2. **Proceso**:
   - Recupera la colección desde `localStorage`.
   - Busca el primer documento que coincida con el criterio utilizando `Array.prototype.find`.

#### Función `findMany`
1. **Parámetros**: `nombreColeccion`, `criterio`.
2. **Proceso**:
   - Recupera la colección desde `localStorage`.
   - Busca todos los documentos que coincidan con el criterio utilizando `Array.prototype.filter`.

#### Función `updateOne`
1. **Parámetros**: `nombreColeccion`, `criterio`, `actualizacion`.
2. **Proceso**:
   - Recupera la colección desde `localStorage`.
   - Encuentra el primer documento que coincida con el criterio.
   - Aplica la actualización y guarda la nueva versión de la colección en `localStorage`.

#### Función `updateMany`
1. **Parámetros**: `nombreColeccion`, `criterio`, `actualizacion`.
2. **Proceso**:
   - Recupera la colección desde `localStorage`.
   - Encuentra todos los documentos que coincidan con el criterio.
   - Aplica la actualización a cada documento y guarda la nueva versión de la colección en `localStorage`.

## 4. Ejemplo de Implementación Técnica

### Función `create`
1. **Verificar Existencia**:
   - Verifica si la colección existe utilizando `localStorage.getItem`.
2. **Crear o Actualizar Colección**:
   - Si la colección no existe, créala con un arreglo vacío.
   - Si la colección existe, añade el nuevo documento a la colección existente.
3. **Guardar Nueva Colección**:
   - Guarda la nueva colección en `localStorage` utilizando `localStorage.setItem`.

### Función `findOne`
1. **Recuperar Colección**:
   - Utiliza `localStorage.getItem` para obtener la colección.
2. **Buscar Documento**:
   - Utiliza `Array.prototype.find` para encontrar el primer documento que coincida con el criterio.

### Función `findMany`
1. **Recuperar Colección**:
   - Utiliza `localStorage.getItem` para obtener la colección.
2. **Buscar Documentos**:
   - Utiliza `Array.prototype.filter` para encontrar todos los documentos que coincidan con el criterio.

### Función `updateOne`
1. **Recuperar Colección**:
   - Utiliza `localStorage.getItem` para obtener la colección.
2. **Buscar y Actualizar Documento**:
   - Utiliza `Array.prototype.find` para encontrar el primer documento que coincida con el criterio.
   - Aplica la actualización al documento.
   - Guarda la nueva colección en `localStorage`.

### Función `updateMany`
1. **Recuperar Colección**:
   - Utiliza `localStorage.getItem` para obtener la colección.
2. **Buscar y Actualizar Documentos**:
   - Utiliza `Array.prototype.filter` para encontrar todos los documentos que coincidan con el criterio.
   - Aplica la actualización a cada documento.
   - Guarda la nueva colección en `localStorage`.

## 5. Mejores Prácticas

### Inmutabilidad
- Siempre crea una nueva versión de la colección al agregar o actualizar documentos para mantener la inmutabilidad.

### Modularidad
- Mantén las funciones modularizadas y bien organizadas para facilitar el mantenimiento y la escalabilidad del sistema.

### Accesibilidad y Compatibilidad
- Asegúrate de que el sistema sea compatible con varios navegadores y de que maneje adecuadamente las limitaciones de `localStorage`.

### Rendimiento
- Considera el tamaño de los datos y optimiza las operaciones de búsqueda y actualización para mantener un buen rendimiento.


### Test de funcionalidad 

```ts
// storage.test.ts
import { create, findOne, findMany, updateOne, updateMany } from './storage';

describe('LocalStorage Inmutable Collection', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('create a new collection and add a document', () => {
    create('testCollection', { id: 1, name: 'Document 1' });
    const storedCollection = JSON.parse(localStorage.getItem('testCollection') || '[]');
    expect(storedCollection).toHaveLength(1);
    expect(storedCollection[0]).toEqual({ id: 1, name: 'Document 1' });
  });

  test('find one document by criterion', () => {
    create('testCollection', { id: 1, name: 'Document 1' });
    const document = findOne('testCollection', (doc) => doc.id === 1);
    expect(document).toEqual({ id: 1, name: 'Document 1' });
  });

  test('find many documents by criterion', () => {
    create('testCollection', { id: 1, name: 'Document 1' });
    create('testCollection', { id: 2, name: 'Document 2' });
    const documents = findMany('testCollection', (doc) => doc.id > 0);
    expect(documents).toHaveLength(2);
  });

  test('update one document by criterion', () => {
    create('testCollection', { id: 1, name: 'Document 1' });
    updateOne('testCollection', (doc) => doc.id === 1, { name: 'Updated Document 1' });
    const document = findOne('testCollection', (doc) => doc.id === 1);
    expect(document).toEqual({ id: 1, name: 'Updated Document 1' });
  });

  test('update many documents by criterion', () => {
    create('testCollection', { id: 1, name: 'Document 1' });
    create('testCollection', { id: 2, name: 'Document 2' });
    updateMany('testCollection', (doc) => doc.id > 0, { updated: true });
    const documents = findMany('testCollection', (doc) => doc.updated);
    expect(documents).toHaveLength(2);
    expect(documents[0].updated).toBe(true);
    expect(documents[1].updated).toBe(true);
  });

  test('create a new collection and add a document', () => {
    create('testCollection', { id: 1, name: 'Document 1' });
    const storedCollection = JSON.parse(localStorage.getItem('testCollection') || '[]');
    expect(storedCollection).toHaveLength(1);
    expect(storedCollection[0]).toEqual({ id: 1, name: 'Document 1' });
  });

  test('create a collection and add multiple documents', () => {
    create('testCollection', { id: 1, name: 'Document 1' });
    create('testCollection', { id: 2, name: 'Document 2' });
    const storedCollection = JSON.parse(localStorage.getItem('testCollection') || '[]');
    expect(storedCollection).toHaveLength(2);
    expect(storedCollection[0]).toEqual({ id: 1, name: 'Document 1' });
    expect(storedCollection[1]).toEqual({ id: 2, name: 'Document 2' });
  });

  test('find one document by criterion', () => {
    create('testCollection', { id: 1, name: 'Document 1' });
    const document = findOne('testCollection', (doc) => doc.id === 1);
    expect(document).toEqual({ id: 1, name: 'Document 1' });
  });

  test('find one document by non-existent criterion returns undefined', () => {
    create('testCollection', { id: 1, name: 'Document 1' });
    const document = findOne('testCollection', (doc) => doc.id === 2);
    expect(document).toBeUndefined();
  });

  test('find many documents by criterion', () => {
    create('testCollection', { id: 1, name: 'Document 1' });
    create('testCollection', { id: 2, name: 'Document 2' });
    const documents = findMany('testCollection', (doc) => doc.id > 0);
    expect(documents).toHaveLength(2);
  });

  test('find many documents by criterion with no matches', () => {
    create('testCollection', { id: 1, name: 'Document 1' });
    const documents = findMany('testCollection', (doc) => doc.id === 2);
    expect(documents).toHaveLength(0);
  });

  test('update one document by criterion', () => {
    create('testCollection', { id: 1, name: 'Document 1' });
    updateOne('testCollection', (doc) => doc.id === 1, { name: 'Updated Document 1' });
    const document = findOne('testCollection', (doc) => doc.id === 1);
    expect(document).toEqual({ id: 1, name: 'Updated Document 1' });
  });

  test('update one document by non-existent criterion does not change collection', () => {
    create('testCollection', { id: 1, name: 'Document 1' });
    updateOne('testCollection', (doc) => doc.id === 2, { name: 'Updated Document 2' });
    const storedCollection = JSON.parse(localStorage.getItem('testCollection') || '[]');
    expect(storedCollection).toHaveLength(1);
    expect(storedCollection[0]).toEqual({ id: 1, name: 'Document 1' });
  });

  test('update many documents by criterion', () => {
    create('testCollection', { id: 1, name: 'Document 1' });
    create('testCollection', { id: 2, name: 'Document 2' });
    updateMany('testCollection', (doc) => doc.id > 0, { updated: true });
    const documents = findMany('testCollection', (doc) => doc.updated);
    expect(documents).toHaveLength(2);
    expect(documents[0].updated).toBe(true);
    expect(documents[1].updated).toBe(true);
  });

  test('update many documents by criterion with no matches does not change collection', () => {
    create('testCollection', { id: 1, name: 'Document 1' });
    create('testCollection', { id: 2, name: 'Document 2' });
    updateMany('testCollection', (doc) => doc.id === 3, { updated: true });
    const documents = findMany('testCollection', (doc) => doc.updated);
    expect(documents).toHaveLength(0);
    const storedCollection = JSON.parse(localStorage.getItem('testCollection') || '[]');
    expect(storedCollection).toHaveLength(2);
    expect(storedCollection[0]).toEqual({ id: 1, name: 'Document 1' });
    expect(storedCollection[1]).toEqual({ id: 2, name: 'Document 2' });
  });

  test('inmutability check: create new version on add', () => {
    create('testCollection', { id: 1, name: 'Document 1' });
    const version1 = JSON.parse(localStorage.getItem('testCollection') || '[]');
    create('testCollection', { id: 2, name: 'Document 2' });
    const version2 = JSON.parse(localStorage.getItem('testCollection') || '[]');
    expect(version1).not.toEqual(version2);
    expect(version1).toHaveLength(1);
    expect(version2).toHaveLength(2);
  });

  test('inmutability check: create new version on update', () => {
    create('testCollection', { id: 1, name: 'Document 1' });
    const version1 = JSON.parse(localStorage.getItem('testCollection') || '[]');
    updateOne('testCollection', (doc) => doc.id === 1, { name: 'Updated Document 1' });
    const version2 = JSON.parse(localStorage.getItem('testCollection') || '[]');
    expect(version1).not.toEqual(version2);
    expect(version1[0].name).toBe('Document 1');
    expect(version2[0].name).toBe('Updated Document 1');
  });

  test('handle empty collection gracefully', () => {
    const document = findOne('emptyCollection', (doc) => doc.id === 1);
    expect(document).toBeUndefined();
    const documents = findMany('emptyCollection', (doc) => doc.id === 1);
    expect(documents).toHaveLength(0);
  });

  test('verify localStorage limit handling', () => {
    const largeDocument = { id: 1, data: 'a'.repeat(5 * 1024 * 1024) }; // 5MB string
    expect(() => create('testCollection', largeDocument)).toThrow(); // LocalStorage limit is typically 5-10MB
  });
});


```
