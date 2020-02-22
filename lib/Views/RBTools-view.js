'use babel';

import { Disposable } from 'atom';

class RBToolsElement extends HTMLDivElement {
  constructor() { super(); }
  // When element is inserted into document, including it into a shadow tree
  connectedCallback() { }
  // When element is removed from document
  disconnectedCallback() { }
  // When attribute is changed, concatenated, deleted or replaced.
  // It is only called for observated attributes
  attributeChangedCallback(attrName, oldValue, newValue, domain) { }
  // when an element is adopted in other document
  adoptedCallback(oldDocument, newDocument) { }
}

export default class RBToolsView extends Disposable {

  _visibility = true;
  _callbackOnDispose = null;

  element = null;
  buttons = [];

  registerCustomElement() {
    if (!customElements.get('rb-tools'))
      customElements.define('rb-tools', RBToolsElement, { extends: 'div' });
  }

  constructor(disposalAction) {
    super();

    // register custom element
    this.registerCustomElement();

    // Create root element
    this.element = document.createElement('rb-tools');
    //this.element.addEventListener('update', this.OnUpdate);
    this._callbackOnDispose = disposalAction;
    return this;
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  dispose() {
    for (it = 0; it < this.buttons.length; it++) {
      this.buttons[it].dispose();
    }
    this.buttons = null;
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

  isVisible() {
    return this._visibility;
  }

  OnModelUpdated() {
    var it = 0;
    var button = null;
    for (it = this.buttons.length - 1; it >= 0; it--) {
      this.element.removeChild(this.buttons[it].element);
      this.buttons[it].dispose();
      this.buttons.pop();
    }
    for (it = 0; it < atom.RBTools.Data.Buttons.length; it++) {
      button = atom.views.getView(atom.RBTools.Data.Buttons[it]);
      this.buttons.push(button);
      this.element.appendChild(this.buttons[it].getElement());
    }
  }

}
