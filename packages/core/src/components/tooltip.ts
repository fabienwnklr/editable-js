import { EditableJS } from '..';
import ClearIcon from '../icons/clear';
import ConfirmIcon from '../icons/confirm';
import RestoreIcon from '../icons/restore';
import { DynamicInput } from '../lib/DynamicInput';
import { EditableJSError, EditableJSInvalidType } from '../lib/Error';
import './tooltip.scss';

export class Tooltip {
  $target: HTMLElement;
  isOpen: boolean = false;
  title: string = 'Title';
  position: string = 'auto';
  ejs: EditableJS;

  // Tooltip elements
  $tooltip!: HTMLDivElement;
  $tooltipContent!: HTMLDivElement;
  $tooltipTitle: HTMLDivElement | null = null;
  $tooltipContentForm!: HTMLDivElement;
  $tooltipContentInput!: HTMLDivElement;
  $tooltipInput!: HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement;
  $tooltipInputClearBtn: HTMLButtonElement | null = null;
  $tooltipContentButtons!: HTMLDivElement;
  $tooltipButtonCancel!: HTMLButtonElement;
  $tooltipButtonConfirm!: HTMLButtonElement;
  $tooltipButtonRestore!: HTMLButtonElement;

  constructor($target: HTMLElement, ejs: EditableJS) {
    this.$target = $target;
    this.ejs = ejs;

    this._init();
    this._initHandler();
  }

  /**
   * Creates the tooltip element and appends it to the target element.
   *
   * This is called in the constructor and doesn't need to be called manually.
   *
   * @private
   */
  private _init() {
    this.$target.classList.add(`${this.ejs._prefix}__target`);
    // Tooltip
    this.$tooltip = document.createElement('div');
    this.$tooltip.classList.add(`${this.ejs._prefix}__tooltip`);
    // Tooltip content
    this.$tooltipContent = document.createElement('div');
    this.$tooltipContent.classList.add(`${this.ejs._prefix}__content`);
    this.$tooltip.appendChild(this.$tooltipContent);
    // Tooltip title
    if (this.title) {
      this.$tooltipTitle = document.createElement('div');
      this.$tooltipTitle.classList.add(`${this.ejs._prefix}__content__title`);
      this.$tooltipTitle.innerText = this.title;
      this.$tooltipContent.appendChild(this.$tooltipTitle);
    }

    // Tooltip content form (input, buttons)
    this.$tooltipContentForm = document.createElement('div');
    this.$tooltipContentForm.classList.add(
      `${this.ejs._prefix}__content__form`
    );
    this.$tooltipContent.appendChild(this.$tooltipContentForm);

    // Tooltip input content
    this.$tooltipContentInput = document.createElement('div');
    this.$tooltipContentInput.classList.add(
      `${this.ejs._prefix}__content__input`
    );
    this.$tooltipContentForm.appendChild(this.$tooltipContentInput);

    this.$tooltipInput = this._getInput();
    this.$tooltipContentInput.appendChild(this.$tooltipInput);

    // Tooltip content buttons
    this.$tooltipContentButtons = document.createElement('div');
    this.$tooltipContentButtons.classList.add(
      `${this.ejs._prefix}__content__buttons`
    );
    this.$tooltipContentForm.appendChild(this.$tooltipContentButtons);

    // Tooltip buttons
    this.$tooltipButtonCancel = document.createElement('button');
    this.$tooltipButtonCancel.classList.add(
      `${this.ejs._prefix}__button__cancel`
    );
    this.$tooltipButtonCancel.title = 'Cancel';
    this.$tooltipButtonCancel.innerHTML = ClearIcon();
    this.$tooltipContentButtons.appendChild(this.$tooltipButtonCancel);

    // Tooltip confirm button
    this.$tooltipButtonConfirm = document.createElement('button');
    this.$tooltipButtonConfirm.classList.add(
      `${this.ejs._prefix}__button__confirm`
    );
    this.$tooltipButtonConfirm.title = 'Confirm';
    this.$tooltipButtonConfirm.innerHTML = ConfirmIcon();
    this.$tooltipContentButtons.appendChild(this.$tooltipButtonConfirm);

    this.$tooltipButtonRestore = document.createElement('button');
    this.$tooltipButtonRestore.classList.add(
      `${this.ejs._prefix}__button__restore`
    );
    this.$tooltipButtonRestore.title = 'Restore';
    this.$tooltipButtonRestore.innerHTML = RestoreIcon();
    this.$tooltipContentButtons.appendChild(this.$tooltipButtonRestore);

    this.$target.after(this.$tooltip);

    if (this.position === 'auto') {
      this._setPositionAuto();
    }
  }

  private _update() {
    const newValue = this.$tooltipInput.value.trim() ?? '';
    if (this.ejs.getValue() !== newValue) {
      this.$target.innerText = newValue;
      this.ejs.trigger('update', { value: newValue, _: this });
    }
    this.close();
  }

  /*************  ✨ Codeium Command ⭐  *************/
  /**
   * Initializes event listeners for the tooltip:
   * - Clicking outside the tooltip or its target will close it.
   * - Pressing the escape key will close the tooltip.
   * - Clicking the close button will close the tooltip.
   * - Toggling the clear button based on the input value length.
   * - Clearing the input value when the clear button is clicked.
   * - Updating the content and closing the tooltip when enter is pressed.
   * - Updating the content and closing the tooltip when the confirm button is clicked.
   * - Restoring the original value when the restore button is clicked.
   */
  /******  910b97e4-07ab-4416-872a-572caf0fa6b2  *******/
  private _initHandler() {
    // close tooltip when click outside
    document.addEventListener('click', (e) => {
      const $target = e.target as Node;
      // if the target is not the tooltip or the target or a child of tooltip, close the tooltip
      if (!this.$target.contains($target) && !this.$tooltip.contains($target)) {
        this.close();
      }
    });

    // Close tooltip when escape key is pressed
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.close();
      }
    });

    // close tooltip when click on close button
    this.$tooltipButtonCancel.addEventListener('click', (e) => {
      e.stopPropagation();
      this.close();
    });

    // Clear button toggle
    this.$tooltipInput.addEventListener('input', () => {
      if (this.$tooltipInputClearBtn) {
        this.$tooltipInputClearBtn.style.display =
          this.$tooltipInput.value.length > 0 ? '' : 'none';
      }
    });

    // Validation update content
    this.$tooltipInput.addEventListener('keypress', (event: Event) => {
      const keyboardEvent = event as KeyboardEvent; // Faire une assertion de type ici
      if (keyboardEvent.key === 'Enter') {
        this._update();
      }
    });

    this.$tooltipButtonConfirm.addEventListener('click', (e) => {
      e.stopPropagation();
      this._update();
    });

    // Restore original value
    this.$tooltipButtonRestore.addEventListener('click', (e) => {
      e.stopPropagation();
      this.ejs.restoreOriginalValue(this.ejs._options.forceValidation);
    });

    this.$tooltipInputClearBtn?.addEventListener('click', (event) => {
      event.stopPropagation();
      this.$tooltipInput.value = '';
      this.$tooltipInputClearBtn!.style.display =
        this.$tooltipInput.value.length > 0 ? '' : 'none';
      this.$tooltipInput.focus();
    });
  }

  private _setPositionAuto() {
    const targetRect = this.$target.getBoundingClientRect();
    const tooltipRect = this.$tooltip.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let top = targetRect.bottom + 5; // Default: below target
    let left = targetRect.left + (targetRect.width - tooltipRect.width) / 2;

    // If not enough space below, try placing above
    if (top + tooltipRect.height > viewportHeight) {
      top = targetRect.top - tooltipRect.height - 5;
    }

    // Ensure the tooltip stays within the viewport (left-right)
    if (left < 0) left = 5;
    if (left + tooltipRect.width > viewportWidth)
      left = viewportWidth - tooltipRect.width - 5;

    this.$tooltip.style.top = `${top}px`;
    this.$tooltip.style.left = `${left}px`;
  }

  private _getInput() {
    const dynamicInput = new DynamicInput(this.ejs._options.type, {
      value: this.ejs.getValue(),
    });

    return dynamicInput.getElement();
  }

  private _getClearButton(): HTMLButtonElement {
    this.$tooltipInputClearBtn = document.createElement('button');
    this.$tooltipInputClearBtn.classList.add(
      `${this.ejs._prefix}__button__clear`
    );
    this.$tooltipInputClearBtn.innerHTML = ClearIcon();
    return this.$tooltipInputClearBtn;
  }

  open() {
    if (this.isOpen) {
      this.close();
      return;
    }
    if (!this.$tooltip) {
      return;
    }

    this.$tooltip.classList.add('show');
    this.focus();
    this.isOpen = true;
  }

  focus(): void {
    const $el = this.$tooltipInput;

    if ($el instanceof HTMLInputElement || $el instanceof HTMLTextAreaElement) {
      $el.focus();
      $el.setSelectionRange($el.value.length, $el.value.length);
    }
    else if ($el instanceof HTMLSelectElement) {
      $el.focus();
    }
  }


  close() {
    if (!this.isOpen || !this.$tooltip) {
      return;
    }
    this.$tooltip.classList.remove('show');
    this.isOpen = false;
  }
}
