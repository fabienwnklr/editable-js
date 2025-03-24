import { describe, expect, it } from 'vitest';
import { EditableJS } from '../src/EditableJS';

describe('Test editablejs', () => {
  document.body.innerHTML = `<div id="test">content</div>`;

  it('should be defined', () => {
    const editablejs = new EditableJS(document.querySelector('#test') as HTMLElement);
    expect(editablejs).toBeDefined();
  });

  it('should be have content', () => {
    const editablejs = new EditableJS(document.querySelector('#test') as HTMLElement);
    setTimeout(() => {
      expect(editablejs.getValue()).toBe('content');
    }, 50);
  });

  it('should be open tooltip when click on element', () => {
    const editablejs = new EditableJS(document.querySelector('#test') as HTMLElement);
    editablejs.$el.click();
    setTimeout(() => {
      expect(editablejs._tooltip.isOpen).toBe(true);
    }, 50);
  });

  it('should be close tooltip when click outside element', () => {
    const editablejs = new EditableJS(document.querySelector('#test') as HTMLElement);
    editablejs.$el.click();
    // wait for tooltip to be open
    setTimeout(() => {
      expect(editablejs._tooltip.isOpen).toBe(true);
      document.body.click();
      setTimeout(() => {
        expect(editablejs._tooltip.isOpen).toBe(false);
      }, 50);
    }, 50);
  });

  it('should be close tooltip when click again on element', () => {
    const editablejs = new EditableJS(document.querySelector('#test') as HTMLElement);
    editablejs.$el.click();
    setTimeout(() => {
      expect(editablejs._tooltip.isOpen).toBe(true);
      editablejs.$el.click();
      setTimeout(() => {
        expect(editablejs._tooltip.isOpen).toBe(false);
      }, 50);
    }, 50);
  });

  it('should be update value when click on element', () => {
    const editablejs = new EditableJS(document.querySelector('#test') as HTMLElement);
    editablejs.$el.click();
    editablejs.$el.innerText = 'test';
    expect(editablejs.getValue()).toBe('test');
  });

  it('should be close tooltip when click on close button', () => {
    const editablejs = new EditableJS(document.querySelector('#test') as HTMLElement);
    editablejs.$el.click();
    setTimeout(() => {
      editablejs._tooltip.$tooltipButtonCancel.click();
      setTimeout(() => {
        expect(editablejs._tooltip.isOpen).toBe(false);
      }, 50);
    }, 50);
  });

  it('should be close tooltip when click on escape key', () => {
    const editablejs = new EditableJS(document.querySelector('#test') as HTMLElement);
    editablejs.$el.click();
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    setTimeout(() => {
      expect(editablejs._tooltip.isOpen).toBe(false);
    }, 50);
  });

  it('should be close tooltip when click on validate  button', () => {
    const editablejs = new EditableJS(document.querySelector('#test') as HTMLElement);
    editablejs.$el.click();
    editablejs._tooltip.$tooltipButtonConfirm.click();
    setTimeout(() => {
      expect(editablejs._tooltip.isOpen).toBe(false);
    }, 50);
  });

  it('should be clear input value when click on clear button', () => {
    const editablejs = new EditableJS(document.querySelector('#test') as HTMLElement);
    editablejs.$el.click();
    editablejs._tooltip.$tooltipInputClearBtn?.click();
    setTimeout(() => {
      expect(editablejs._tooltip.$tooltipInput.value).toBe('');
    }, 50);
  });

  it('should be restore original value when click on restore button', () => {
    const editablejs = new EditableJS(document.querySelector('#test') as HTMLElement);
    editablejs.$el.click();
    editablejs._tooltip.$tooltipInput.value = 'test';
    editablejs._tooltip.$tooltipButtonRestore.click();
    setTimeout(() => {
      expect(editablejs._tooltip.$tooltipInput.value).toBe('content');
    }, 50);
  });

  it('should be update value when click on enter key', () => {
    const editablejs = new EditableJS(document.querySelector('#test') as HTMLElement);
    editablejs.$el.click();
    editablejs._tooltip.$tooltipInput.value = 'test';
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    setTimeout(() => {
      expect(editablejs.getValue()).toBe('test');
    }, 50);
  });

  it('should be update value when click on validate button', () => {
    const editablejs = new EditableJS(document.querySelector('#test') as HTMLElement);
    editablejs.$el.click();
    editablejs._tooltip.$tooltipInput.value = 'test';
    editablejs._tooltip.$tooltipButtonConfirm.click();
    setTimeout(() => {
      expect(editablejs.getValue()).toBe('test');
    }, 50);
  });
});
