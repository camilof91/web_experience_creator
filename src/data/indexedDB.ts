

export const openDB = (dbName: string, version: number) => {
    return new Promise<IDBDatabase>((resolve, reject) => {
      const request = indexedDB.open(dbName, version);
  
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        if (!db.objectStoreNames.contains('resources')) {
          db.createObjectStore('resources', { keyPath: 'id', autoIncrement: true });
        }
      };
  
      request.onsuccess = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        resolve(db);
      };
  
      request.onerror = (event) => {
        reject(`Error opening database: ${(event.target as IDBOpenDBRequest).error}`);
      };
    });
  };
  
  export const addResource = (db: IDBDatabase, resource: any) => {
    return new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(['resources'], 'readwrite');
      const store = transaction.objectStore('resources');
      const request = store.add(resource);
  
      request.onsuccess = () => {
        resolve();
      };
  
      request.onerror = (event) => {
        reject(`Error adding resource: ${(event.target as IDBRequest).error}`);
      };
    });
  };
  
  export const getAllResources = (db: IDBDatabase) => {
    return new Promise<any[]>((resolve, reject) => {
      const transaction = db.transaction(['resources'], 'readonly');
      const store = transaction.objectStore('resources');
      const request = store.getAll();
  
      request.onsuccess = () => {
        resolve(request.result);
      };
  
      request.onerror = (event) => {
        reject(`Error getting resources: ${(event.target as IDBRequest).error}`);
      };
    });
  };