/*
Objetivo de la funcion create:
Esta función se utiliza para almacenar o actualizar un documento en una colección
dentro de localStorage. La colección está identificada por su nombre.
*/
export const create = (collectionName: string, document: Record<string, unknown>): void => {
    // Verificar si la colección ya existe en localStorage
    const coleccionExistente = localStorage.getItem(collectionName);
    if (!coleccionExistente) {
        // Si la colección no existe, créala con el nuevo documento
        const nuevaColeccion = [document];
        localStorage.setItem(collectionName, JSON.stringify(nuevaColeccion));
        return;
    }
    // Si la colección existe, recupera la colección actual
    const coleccion: Record<string, unknown>[] = JSON.parse(coleccionExistente);
    // Verificar si el objeto ya existe en la colección
    const indiceExistente = coleccion.findIndex(item => item.id === document.id);
    if (indiceExistente !== -1) {
        // Si el objeto ya existe, actualizarlo
        coleccion[indiceExistente] = document;
        localStorage.setItem(collectionName, JSON.stringify(coleccion));
        return;
    }
    // Si el objeto no existe, añadir el nuevo documento a la colección
    coleccion.push(document);
    // Guardar la nueva versión de la colección en localStorage
    localStorage.setItem(collectionName, JSON.stringify(coleccion));
};



/*
Obejtivo de la funcion findOne:
buscar y devolver el primer documento en una colección almacenada en 
localStorage que coincida con un conjunto específico de criterios de búsqueda. 
*/
export const findOne = (collectionName: string, criterio: Partial<Record<string, unknown>>): Record<string, unknown> | undefined => {
    // Recuperar la colección desde localStorage
    const coleccionExistente = localStorage.getItem(collectionName);
    
    if (!coleccionExistente) {
        return undefined; // Si la colección no existe, devolver undefined
    }
    
    // Parsear la colección JSON
    const coleccion: Record<string, unknown>[] = JSON.parse(coleccionExistente);

    // Buscar el primer documento que coincida con el criterio
    // find se usa para encontrar el primer documento que coincidan con el criterio.
    const documentoEncontrado = coleccion.find(document => {
        return Object.keys(criterio).every(key => document[key] === criterio[key]);
    });

    return documentoEncontrado; // Devolver el documento encontrado o undefined si no se encontró ninguno
};



/*
Objetivo de la funcion findMany:
recuperar todos los documentos de una colección almacenada en
localStorage que coincidan con un conjunto dado de criterios de búsqueda.
*/
export const findMany = (collectionName: string, criterio: Partial<Record<string, unknown>>): Record<string, unknown>[] => {
    // Recuperar la colección desde localStorage
    const coleccionExistente = localStorage.getItem(collectionName);

    // Si la colección no existe, devolver un array vacío
    if (!coleccionExistente) {
        return [];
    }

    // Parsear la colección para convertirla en un array de objetos
    const coleccion: Record<string, unknown>[] = JSON.parse(coleccionExistente);

    // Buscar todos los documentos que coincidan con el criterio
    // filter se usa para encontrar todos los documentos que coincidan con el criterio.
    const documentosEncontrados = coleccion.filter(document => {
        return Object.keys(criterio).every(key => document[key] === criterio[key]);
    });

    // Devolver los documentos encontrados
    return documentosEncontrados;
};



/*
Obejtivo de la funcion updateOne:
actualizar un documento específico dentro de una colección almacenada en localStorage 
*/

export const updateOne = (nombreColeccion: string, criterio: Partial<Record<string, unknown>>, actualizacion: Partial<Record<string, unknown>>): boolean => {
    // Recuperar la colección desde localStorage
    const coleccionExistente = localStorage.getItem(nombreColeccion);
    // Si la colección no existe, salir sin hacer cambios
    if (!coleccionExistente) {
        console.error(`La colección '${nombreColeccion}' no existe en localStorage.`);
        return false;
    }
    // Parsear la colección para convertirla en un array de objetos
    let coleccion: Record<string, unknown>[] = JSON.parse(coleccionExistente);
    // Encontrar el primer documento que coincida con el criterio
    const documentoEncontrado = coleccion.find(documento => {
        return Object.keys(criterio).every(key => documento[key] === criterio[key]);
    });
    // Si no se encuentra ningún documento que coincida con el criterio, salir sin hacer cambios
    if (!documentoEncontrado) {
        console.error(`No se encontró ningún documento que coincida con el criterio en la colección '${nombreColeccion}'.`);
        return false;
    }
    // Aplicar la actualización al documento encontrado
    // Object.assign se usa para aplicar las propiedades y valores de actualizacion al documentoEncontrado.
    Object.assign(documentoEncontrado, actualizacion);

    // Guardar la nueva versión de la colección en localStorage
    localStorage.setItem(nombreColeccion, JSON.stringify(coleccion));
    return true;
};



/*
Obejtivo de la funcion updateMany:
actualizar múltiples documentos que coincidan con cierto criterio
dentro de una colección almacenada en localStorage. 
*/
export const updateMany = (nombreColeccion: string, criterio: Partial<Record<string, unknown>>, actualizacion: Partial<Record<string, unknown>>): void => {
    // Recuperar la colección desde localStorage
    const coleccionExistente = localStorage.getItem(nombreColeccion);

    if (!coleccionExistente) {
        console.error(`La colección ${nombreColeccion} no existe en localStorage.`);
        return;
    }

    // Parsear la colección desde JSON a un arreglo de objetos
    let coleccion: Record<string, unknown>[] = JSON.parse(coleccionExistente);

    // Encontrar y actualizar documentos que coincidan con el criterio
    coleccion = coleccion.map(documento => {
        // Verificar si el documento cumple con el criterio
        const cumpleCriterio = Object.keys(criterio).every(key => documento[key] === criterio[key]);

        // Aplicar la actualización si el documento cumple con el criterio
        if (cumpleCriterio) {
            return { ...documento, ...actualizacion };
        } else {
            return documento;
        }
    });

    // Guardar la nueva versión de la colección en localStorage
    localStorage.setItem(nombreColeccion, JSON.stringify(coleccion));
};


export type Document = Record<string, unknown>;

export const getCollection = (collectionName: string): Document[] => {
  const storedCollection = localStorage.getItem(collectionName);
  return storedCollection ? JSON.parse(storedCollection) : [];
};

export  const saveCollection = (collectionName: string, collection: Document[]): void => {
  localStorage.setItem(collectionName, JSON.stringify(collection));
};

/*
Objetivo de la función deleteOne:
Eliminar un solo documento que coincida con un conjunto específico de criterios
dentro de una colección almacenada en localStorage.
*/
export const deleteOne = (collectionName: string, criterio: Partial<Record<string, unknown>>): boolean => {
  // Recuperar la colección desde localStorage
  const coleccionExistente = localStorage.getItem(collectionName);

  // Si la colección no existe, salir sin hacer cambios
  if (!coleccionExistente) {
      console.error(`La colección '${collectionName}' no existe en localStorage.`);
      return false;
  }

  // Parsear la colección para convertirla en un array de objetos
  const coleccion: Record<string, unknown>[] = JSON.parse(coleccionExistente);

  // Encontrar el índice del primer documento que coincida con el criterio
  const indiceDocumento = coleccion.findIndex(documento => {
      return Object.keys(criterio).every(key => documento[key] === criterio[key]);
  });

  // Si no se encuentra ningún documento que coincida con el criterio, salir sin hacer cambios
  if (indiceDocumento === -1) {
      console.error(`No se encontró ningún documento que coincida con el criterio en la colección '${collectionName}'.`);
      return false;
  }

  // Eliminar el documento encontrado de la colección
  coleccion.splice(indiceDocumento, 1);

  // Guardar la nueva versión de la colección en localStorage
  localStorage.setItem(collectionName, JSON.stringify(coleccion));
  return true;
};

/*
Objetivo de la función deleteMany:
Eliminar múltiples documentos que coincidan con un conjunto específico de criterios
dentro de una colección almacenada en localStorage.
*/
export const deleteMany = (collectionName: string, criterio: Partial<Record<string, unknown>>): number => {
  // Recuperar la colección desde localStorage
  const coleccionExistente = localStorage.getItem(collectionName);

  // Si la colección no existe, salir sin hacer cambios
  if (!coleccionExistente) {
      console.error(`La colección '${collectionName}' no existe en localStorage.`);
      return 0;
  }

  // Parsear la colección para convertirla en un array de objetos
  let coleccion: Record<string, unknown>[] = JSON.parse(coleccionExistente);

  // Filtrar los documentos que no coincidan con el criterio
  const nuevaColeccion = coleccion.filter(documento => {
      return !Object.keys(criterio).every(key => documento[key] === criterio[key]);
  });

  // Calcular el número de documentos eliminados
  const documentosEliminados = coleccion.length - nuevaColeccion.length;

  // Guardar la nueva versión de la colección en localStorage
  localStorage.setItem(collectionName, JSON.stringify(nuevaColeccion));
  
  return documentosEliminados;
};


interface AnimationOptions {
  duration: number;
  iterations: number;
  easing: string;
  delay?: number;
}

export const createBlinkZoomBounceShineAnimation = (element: HTMLElement, options: AnimationOptions): void =>{
  const keyframes: Keyframe[] = [
    { opacity: 1, transform: 'scale(1)', filter: 'brightness(1)' },
    { opacity: 0.7, transform: 'scale(0.9)', filter: 'brightness(1.2)' },
    { opacity: 0.5, transform: 'scale(0.8)', filter: 'brightness(1.5)' },
    { opacity: 0.3, transform: 'scale(0.7)', filter: 'brightness(1.7)' },
    { opacity: 1, transform: 'scale(1.2)', filter: 'brightness(2)', offset: 0.6 },
    { opacity: 0.7, transform: 'scale(1.1)', filter: 'brightness(1.5)' },
    { opacity: 1, transform: 'scale(1)', filter: 'brightness(1)' }
  ];

  element.animate(keyframes, {
    duration: options.duration,
    iterations: options.iterations,
    easing: options.easing,
    delay: options.delay || 0,
  });
}