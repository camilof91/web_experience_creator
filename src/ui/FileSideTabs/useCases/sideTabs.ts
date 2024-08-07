export function initializeSideTabs() {
    const navItems = document.querySelectorAll<HTMLElement>('.nav__item'); // Obtener todos los elementos de la barra lateral
  
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        const sectionName = item.dataset.section.toLowerCase(); // Obtener el nombre de la sección seleccionada (en minúsculas)
  
        // Remover la clase 'nav__item--active' de todos los elementos de la barra lateral
        navItems.forEach(navItem => {
          navItem.classList.remove('nav__item--active');
        });
  
        // Agregar la clase 'nav__item--active' solo al elemento seleccionado
        item.classList.add('nav__item--active');
  
        // Ocultar todas las secciones
        hideAllSections();
  
        // Mostrar las secciones correspondientes según la opción seleccionada
        if (sectionName === 'todos') {
          showAllSections();
        } else {
          showSelectedSection(sectionName);
        }
      });
    });
  
    // Función para ocultar todas las secciones
    function hideAllSections() {
      const sections = document.querySelectorAll<HTMLElement>('.sidebar__section');
      sections.forEach(section => {
        section.style.display = 'none'; // Ocultar las secciones estableciendo display: none
      });
    }
  
    // Función para mostrar todas las secciones
    function showAllSections() {
      const sections = document.querySelectorAll<HTMLElement>('.sidebar__section');
      sections.forEach(section => {
        section.style.display = 'block'; // Mostrar todas las secciones estableciendo display: block
      });
    }
  
    // Función para mostrar solo la sección seleccionada
    function showSelectedSection(sectionName: string) {
      const selectedSection = document.querySelector<HTMLElement>(`.sidebar__section[data-section="${sectionName}"]`);
      if (selectedSection) {
        selectedSection.style.display = 'block'; // Mostrar la sección seleccionada estableciendo display: block
      }
    }
  }

  