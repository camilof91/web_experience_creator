

export type ComponentCreatorUI = {
  id: string;
  type: string;
  name: string;
  text?: string;
  attributes?: Record<string, string>;
  children?: Array <ComponentCreatorUI>;
} | {
  id: string;
  type: "video";
  name: string;
  text?: string;
  attributes: Record<string, string>;
  sources: { src: string; type: string; }[];
} | {
  id: string;
  type: "audio";
  name: string;
  text?: string;
  attributes: Record<string, string>;
  sources: { src: string; type: string; }[];
} | {
  id: string;
  type: "iframe";
  name: string;
  text?: string;
  attributes: Record<string, string>;
} | {
  id: string;
  type: "canvas";
  name: string;
  text?: string;
  attributes: Record<string, string>;
};



