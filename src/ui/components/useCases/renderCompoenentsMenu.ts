
export const renderCompoenetsMenu = (container: HTMLElement, componentsCreators: HTMLElement[]) => {
  container.innerHTML = "";
  componentsCreators.forEach(($component) => container.appendChild($component))
};

