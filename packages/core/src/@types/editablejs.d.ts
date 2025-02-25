enum EditableJSEvent {
  UPDATE = 'update',
  RESTORE = 'restore',
}

export type EditableJSAvailableTypes =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'date'
  | 'color'
  | 'time'
  | 'select'
  | 'textarea';

export type EditableJSOptions = {
  type: EditableJSAvailableTypes;
  placeholder?: string;
  restore?: boolean;
  forceValidation?: boolean;
};
