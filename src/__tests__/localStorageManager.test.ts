// src/__tests__/localStorageFunctions.test.ts
import { LocalStorage } from 'node-localstorage';
import { create, findOne, findMany, updateOne, updateMany } from '../ui/core/useCases/storage/localStorageManager';

// Mock localStorage for testing
const localStorage = new LocalStorage('./scratch');

// Clear localStorage before each test
beforeEach(() => {
  localStorage.clear();
});

describe('localStorageFunctions', () => {
  test('create should add a new document', () => {
    create('miColeccion', { id: '1', name: 'Documento 1' });
    const documento = findOne('miColeccion', { id: '1' });
    expect(documento).toEqual({ id: '1', name: 'Documento 1' });
  });

  test('findOne should find a document by criteria', () => {
    create('miColeccion', { id: '1', name: 'Documento 1' });
    const documento = findOne('miColeccion', { id: '1' });
    expect(documento).toEqual({ id: '1', name: 'Documento 1' });
  });

  test('findMany should find all documents matching criteria', () => {
    create('miColeccion', { id: '1', name: 'Documento 1' });
    create('miColeccion', { id: '2', name: 'Documento 2' });
    const documentos = findMany('miColeccion', { name: 'Documento 1' });
    expect(documentos).toEqual([{ id: '1', name: 'Documento 1' }]);
  });

  test('updateOne should update a document by criteria', () => {
    create('miColeccion', { id: '1', name: 'Documento 1' });
    updateOne('miColeccion', { id: '1' }, { name: 'Documento Actualizado' });
    const documento = findOne('miColeccion', { id: '1' });
    expect(documento).toEqual({ id: '1', name: 'Documento Actualizado' });
  });

  test('updateMany should update all documents matching criteria', () => {
    create('miColeccion', { id: '1', name: 'Documento 1' });
    create('miColeccion', { id: '2', name: 'Documento 1' });
    updateMany('miColeccion', { name: 'Documento 1' }, { name: 'Documento Actualizado' });
    const documentos = findMany('miColeccion', { name: 'Documento Actualizado' });
    expect(documentos).toEqual([
      { id: '1', name: 'Documento Actualizado' },
      { id: '2', name: 'Documento Actualizado' },
    ]);
  });
});
