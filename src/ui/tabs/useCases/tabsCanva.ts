import { updateLayerList } from "../../FilesLayers/useCases/updateLayerList";


export const tabactivation = (tabs: Array<HTMLElement>, canvasContents: Array<HTMLElement>) => {  
    tabs.forEach(($tab) => {
        $tab.addEventListener("click", () => {
            // Desactiva todas las pestañas y contenidos
            tabs.forEach(($tab) => $tab.classList.remove("canvas__tab--active"));
            canvasContents.forEach(($canvas) => $canvas.classList.remove("canvas__content--active"));
            
            // Activa la pestaña clickeada
            $tab.classList.add("canvas__tab--active");
            
            // Activa el contenido correspondiente a la pestaña clickeada
            const $canvasToActive = document.querySelector<HTMLElement>(`#tab-content-${$tab.dataset.tab}`);
            const layerList = document.querySelector<HTMLElement>('#layer_list');
            if ($canvasToActive ) {
              $canvasToActive.classList.add("canvas__content--active");
            }
            if ($canvasToActive && layerList) {
                updateLayerList($canvasToActive, layerList);
            }

        });
    });
};
