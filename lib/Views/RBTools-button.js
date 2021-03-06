'use babel';

import { Disposable } from 'atom';
var path = require('path');
//var cp = require('child_process');

class RBToolsButtonElement extends HTMLDivElement {
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

export default class RBToolsButton extends Disposable {

  _visibility = true;
  element = null;
  _tooltip = null;
  _callbackOnDispose = null;

  registerCustomElement() {
    if (!customElements.get('rb-tools-button'))
      customElements.define('rb-tools-button', RBToolsButtonElement, { extends: 'div' });
  }

  constructor(disposalAction) {
    super();

    this._callbackOnDispose = disposalAction;
    // register custom element
    this.registerCustomElement();

    // Create root element
    this.element = document.createElement('rb-tools-button');
    this.element.classList.add('btn');
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  dispose() {
    //atom.tooltips.findTooltips(this.element).forEach((e) => e.destroy());
    this._callbackOnDispose = null;
    this._tooltip.dispose();
    this.element.onclick = null;
    this.element.remove();
    this.element = null;
    this.disposed = true;
  }

  set(btn_model) {
    if (btn_model.IconType == "atomIcon") this.element.innerHTML = "<span class=\"icon icon-" + btn_model.Icon + "\"></span>";
    else if (btn_model.IconType == "url") this.element.innerHTML = "<img src=\"" + btn_model.Icon + "\">";
    if (btn_model.Tooltip != "") this._tooltip = atom.tooltips.add(this.element, { title: btn_model.Tooltip });
    var self = this;
    this.element.onclick = function (event) {
        self.onClick(event, btn_model.ActionType, btn_model.Action, btn_model.Params);
    }
  }

  getElement() {
    return this.element;
  }

  isVisible() {
    return this._visibility;
  }

  onClick(event, actionType, action, params) {
    if (actionType == 'atomCommand') {
      atom.commands.dispatch(action.split(':')[0], action);
    } else if (actionType == 'nodeCommand') {
      var paramsOverwritten = params.slice();
      var regex = null;
      var matches = null;
      var paramIndex = 0;
      var matchIndex = 0;
      var allParams = "";

      var currentFile = null;
      var currentFolder = null;
      var currentSelectedElementInTreeViewer = null;
      var currentProjectFolder = null;

      currentFile = atom.workspace.getActiveTextEditor().getPath();
      currentFolder = path.dirname(atom.workspace.getActiveTextEditor().getPath());
      try {
        currentSelectedElementInTreeViewer = document.querySelector('.tree-view .selected').getPath();
        currentProjectFolder = atom.project.relativizePath(currentSelectedElementInTreeViewer)[0];
      } catch (ex) {
        currentProjectFolder = "";
      }

      action = "var child_process = require('child_process');\n" + action;
      action = action.replace(/\\/g, '\\\\');
      var replaceString = function (originalString, match, newValue) {
        return (originalString.replace(match, newValue)).replace(/\\/g, '\\\\');
      }
      var replaceAll = function (originalString) {
        var result = originalString.trim();
        result = replaceString(result, /\$currentFile/ig, currentFile);
        result = replaceString(result, /\$currentFolder/ig, currentFolder);
        result = replaceString(result, /\$currentProjectFolder/ig, currentProjectFolder);
        return result;
      }
      for (paramIndex = 0; paramIndex < params.length; paramIndex++) {
        paramsOverwritten[paramIndex] = replaceAll(paramsOverwritten[paramIndex]);
        regex = new RegExp("\\$" + (paramIndex + 1), 'g');
        action = action.replace(regex, paramsOverwritten[paramIndex]);
        allParams = (paramIndex > 0 ? ", " : "") + paramsOverwritten[paramIndex];
      }
      eval(action);
    }

  }
}
