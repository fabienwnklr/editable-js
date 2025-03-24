import { EditableJS } from '../EditableJS';

declare global {
  interface Window {
    ejs: EditableJS[];
  }
}

export {};
