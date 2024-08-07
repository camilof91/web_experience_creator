import { deleteLayerElement } from './deleteLayerElement';

export const updateLayerList = (canvas: HTMLElement, layerList: HTMLElement) => {
  const updateList = () => {
    if (!canvas || !layerList) return;

    layerList.innerHTML = ''; // Limpiar la lista actual

    const typeCounters: { [key: string]: number } = {}; // Contadores para cada tipo de elemento

    const createLayerItem = (element: HTMLElement, depth: number = 0): HTMLLIElement => {
      const li = document.createElement('li');
      li.classList.add('sidebar__item');
      li.style.marginLeft = `${depth * 20}px`; // Añadir margen para indicar la profundidad

      const elementType = element.tagName.toLowerCase();

      // Incrementar el contador para el tipo de elemento
      if (!typeCounters[elementType]) {
        typeCounters[elementType] = 0;
      }
      typeCounters[elementType]++;

      const itemText = document.createElement('span');
      itemText.textContent = `${elementType} ${typeCounters[elementType]}`;
      li.appendChild(itemText);
      li.draggable = true; // Hacer los elementos arrastrables

      // Añadir un botón de eliminación
      const deleteButton = document.createElement('button');
      deleteButton.classList.add('delete-button');
      deleteButton.style.backgroundImage = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1rem' height='1rem' viewBox='0 0 20 20'%3E%3Cpath fill='%23e20c0c' d='M8.5 4h3a1.5 1.5 0 0 0-3 0m-1 0a2.5 2.5 0 0 1 5 0h5a.5.5 0 0 1 0 1h-1.054l-1.194 10.344A3 3 0 0 1 12.272 18H7.728a3 3 0 0 1-2.98-2.656L3.554 5H2.5a.5.5 0 0 1 0-1zM5.741 15.23A2 2 0 0 0 7.728 17h4.544a2 2 0 0 0 1.987-1.77L15.439 5H4.561zM8.5 7.5A.5.5 0 0 1 9 8v6a.5.5 0 0 1-1 0V8a.5.5 0 0 1 .5-.5M12 8a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z'/%3E%3C/svg%3E\")";
      deleteButton.style.backgroundSize = 'contain';
      deleteButton.style.backgroundRepeat = 'no-repeat';
      deleteButton.style.width = '24px';
      deleteButton.style.height = '24px';
      deleteButton.style.border = 'none';
      deleteButton.style.cursor = 'pointer';
      deleteButton.addEventListener('click', (e) => {
        e.stopPropagation(); // Evitar que el evento click se propague y afecte el drag and drop
        deleteLayerElement(li);
      });

      li.appendChild(deleteButton);

      // Asignar ID y atributo data-relation-element
      let elementId = element.id;
      if (!elementId) {
        elementId = `element-${Math.random().toString(36).substr(2, 9)}`;
        element.id = elementId;
      }
      li.setAttribute('data-relation-element', elementId);

      const children = Array.from(element.children) as HTMLElement[];
      if (children.length > 0) {
        const ul = document.createElement('ul');
        ul.classList.add('sidebar__sublist');
        children.forEach((child) => {
          ul.appendChild(createLayerItem(child, depth + 1));
        });
        li.appendChild(ul);
      }

      return li;
    };

    Array.from(canvas.children).forEach((element: HTMLElement) => {
      layerList.appendChild(createLayerItem(element));
    });

    // Agregar eventos para drag and drop
    const items = layerList.querySelectorAll('.sidebar__item') as NodeListOf<HTMLElement>;
    addDragAndDropEvents(items);
  };

  const observer = new MutationObserver(updateList);
  if (canvas) {
    observer.observe(canvas, { childList: true, subtree: true });
  }
  updateList();
};

// Agregar eventos para drag and drop
const addDragAndDropEvents = (items: NodeListOf<HTMLElement>) => {
  items.forEach((item) => {
    item.addEventListener('dragstart', (e) => {
      e.dataTransfer!.setData('text/plain', item.getAttribute('data-relation-element')!);
      item.classList.add('dragging');
    });

    item.addEventListener('dragend', () => {
      item.classList.remove('dragging');
    });

    item.addEventListener('dragover', (e) => {
      e.preventDefault();
      const draggingItem = document.querySelector('.dragging') as HTMLElement;
      const afterElement = getDragAfterElement(item.parentElement!, e.clientY);
      if (afterElement == null) {
        item.parentElement!.appendChild(draggingItem);
      } else {
        item.parentElement!.insertBefore(draggingItem, afterElement);
      }
    });

    item.addEventListener('drop', (e) => {
      e.preventDefault();
      const id = e.dataTransfer!.getData('text');
      const draggedElement = document.querySelector(`[data-relation-element="${id}"]`) as HTMLElement;
      if (draggedElement && item !== draggedElement) {
        const parentUl = item.querySelector('.sidebar__sublist') || document.createElement('ul');
        parentUl.classList.add('sidebar__sublist');
        parentUl.appendChild(draggedElement);
        if (!item.querySelector('.sidebar__sublist')) {
          item.appendChild(parentUl);
        }
      }
    });
  });
};

const getDragAfterElement = (container: HTMLElement, y: number) => {
  const draggableElements = [...container.querySelectorAll('.sidebar__item:not(.dragging)')];

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
};


