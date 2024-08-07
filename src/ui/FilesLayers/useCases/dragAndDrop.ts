// src/ui/layers/useCases/dragAndDrop.ts

let dragSrcEl: HTMLElement | null = null;

export const handleDragStart = (e: DragEvent) => {
  if (!(e.target instanceof HTMLElement)) return;

  dragSrcEl = e.target;
  e.dataTransfer?.setData('text/html', e.target.innerHTML);
  e.target.classList.add('dragging');
};

export const handleDragOver = (e: DragEvent) => {
  if (e.preventDefault) {
    e.preventDefault();
  }
  e.dataTransfer!.dropEffect = 'move';
  return false;
};

export const handleDrop = (e: DragEvent) => {
  if (!(e.target instanceof HTMLElement)) return;
  if (dragSrcEl === e.target) return;

  if (e.stopPropagation) {
    e.stopPropagation();
  }

  dragSrcEl!.innerHTML = e.target.innerHTML;
  e.target.innerHTML = e.dataTransfer!.getData('text/html');
  return false;
};

export const handleDragEnd = () => {
  const items = document.querySelectorAll('.sidebar__item');
  items.forEach(item => {
    item.classList.remove('dragging');
  });
};

export const addDragAndDropEvents = (items: NodeListOf<HTMLElement>) => {
  items.forEach(item => {
    item.addEventListener('dragstart', handleDragStart);
    item.addEventListener('dragover', handleDragOver);
    item.addEventListener('drop', handleDrop);
    item.addEventListener('dragend', handleDragEnd);
  });
};