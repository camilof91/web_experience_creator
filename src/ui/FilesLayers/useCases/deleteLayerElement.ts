
export const deleteLayerElement = (li: HTMLLIElement) => {
    const elementId = li.getAttribute('data-relation-element');
    const relatedElement = document.getElementById(elementId!);
    if (relatedElement) {
      relatedElement.remove(); // Eliminar el elemento del DOM
    }
    li.remove(); // Eliminar el item de la lista
  };

  