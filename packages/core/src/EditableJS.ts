import './styles/index.scss';
import { Tooltip } from './components/tooltip';
import { MicroEvent } from './lib/MicroEvent';
import { defaultOptions } from './constants';
import { MissingPropertyError } from './lib/Error';
import MicroPlugin from './lib/MicroPlugin';

export class EditableJS extends MicroPlugin(MicroEvent) {
  $el: HTMLElement;
  _tooltip: Tooltip;
  _originalValue = '';
  _options: EditableJSOptions;
  _prefix = 'ejs';

  // Private properties
  #id = '';

  /**
   * Creates a new instance of EditableJS.
   *
   * @param {HTMLAnchorElement} $el Element to make editable
   * @param {EditableJSOptions} options
   */
  constructor($el: HTMLElement, options?: Partial<EditableJSOptions>) {
    super();

    this._options = {
      ...defaultOptions,
      ...this.parseEjsAttributes($el),
      ...options,
    };

    this.$el = $el;
    this._tooltip = new Tooltip(this.$el, this);

    this._checkRequiredProperties();
    this._init();
    this._initHandler();
  }

  private _checkRequiredProperties() {
    if (!this.$el) {
      throw new MissingPropertyError('Element is required');
    }

    if (!this._options.type) {
      throw new MissingPropertyError('Type is required');
    }
  }

  private parseEjsAttributes<T extends Record<string, string>>(
    element: HTMLElement
  ): T {
    const options: Partial<T> = {};

    Array.from(element.attributes).forEach((attr) => {
      if (attr.name.startsWith(`data-${this._prefix}-`)) {
        const key = attr.name
          .replace(`data-${this._prefix}-`, '')
          .replace(/-([a-z])/g, (_, letter) => letter.toUpperCase()); // Convertit kebab-case en camelCase
        options[key as keyof T] = attr.value as any;
      }
    });

    return options as T;
  }

  private _init() {
    this.#id = this._generateUniqueId();
    this.$el.setAttribute(`data-${this._prefix}-id`, this.#id);
  }

  private _generateUniqueId() {
    return this._prefix + '-' + Date.now();
  }

  _initHandler() {
    this.$el.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      this._tooltip.open();
    });
  }

  /**
   * Restores the original value of the element.
   *
   * @param {boolean} forceValidation - If true, the original value will be set without validation.
   */
  restoreOriginalValue(forceValidation: boolean = false) {
    if (this.getValue() === this._originalValue) return;

    this._tooltip.$tooltipInput.value = this._originalValue;
    if (forceValidation) {
      this.$el.innerText = this._originalValue;
      this.trigger('update', { value: this._originalValue, _: this });
      this.trigger('restore', { _: this });
      this._tooltip.close();
    }
  }

  getValue() {
    return this.$el.innerText;
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const $ejsElements = document.querySelectorAll(`[data-ejs="true"]`);
  $ejsElements.forEach(($el) => {
    if ($el instanceof HTMLElement) {
      const ejs = new EditableJS($el);
      ejs.on('update', (ejs: EditableJS) => console.log('Updated ! ', ejs));
      console.log(ejs);
    } else {
      throw new Error(`Element ${$el} is not an HTMLElement`);
    }
  });
});
