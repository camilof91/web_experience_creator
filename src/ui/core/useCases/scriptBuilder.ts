// Tipo para representar atributos del elemento
export type Attributes = Record<string, string>;

// Tipo para representar estilos del elemento
export type Styles = Record<string, string>;

// Tipo para representar eventos del elemento
export type MiniEvent = {
  type: string;
  handler: (rootElement: HTMLElement) => void;
};

// Tipo para representar pseudo-clases
export type PseudoClasses = Record<string, Record<string, string>>;

// Tipo para representar pseudo-selectores
export type PseudoSelectors = Record<string, Record<string, string>>;

// Tipo para representar Keyframes 
export type CustomKeyframe = [string, { [property: string]: string }];

// Tipo para representar Animations
export type CustomAnimation = { [animationName: string]: Keyframe[] };

// Tipo para representar Media Rules
export type MediaRule = {
  query: string;
  rules: { [selector: string]: { [property: string]: string } };
};

// Tipo para representar Font Face Rules
export type FontFaceRule = { [property: string]: string };

// Tipo para representar Import Rules
export type ImportRule = {
  url: string;
  media?: string;
};

// Tipo para representar Supports Rules
export type SupportsRule = {
  condition: string;
  rules: { [selector: string]: { [property: string]: string } };
};

/* Tipo para representar AtCSSRules
export type AtCSSRules = {
  "@keyframes"?: CustomAnimation;
  "@media"?: MediaRule;
  "@font-face"?: FontFaceRule;
  "@import"?: ImportRule;
  "@supports"?: SupportsRule;
};
*/

export type CSSRules = {
  "@keyframes"?: string[];
  "@media"?: string[];
  "@font-face"?: string[];
  "@import"?: string[];
  "@supports"?: string[];
  "clases"?: string[];
};

// Definición de MiniHTMLElement // actualizar
export interface MiniHTMLElement {
  tagName: string;
  attributes: Attributes;
  children: MiniHTMLElement[];
  styles: Styles;
  events: MiniEvent[];
  className: Record<string, Styles>;
  rules?: CSSRules;
  styleId: string;
  textContent?: string;
}

// Interfaz para representar los argumentos genéricos que debería recibir un evento
export interface UIEventArguments {
  rootElement: HTMLElement;
  event: Event;
  additionalData?: any;
}
