'use babel';

import { Disposable } from 'atom';

export default class Button extends Disposable {

  constructor(name, type, tooltip, icontype, icon, actiontype, action, params) {
    super();
    
    this._name = name;
    this._type = type;
    this._tooltip = tooltip;
    this._iconType = icontype
    this._icon = icon;
    this._actionType = actiontype;
    this._action = action;
    this._params = params;
    this._onValueChanged = null;
  }

  get Name() { return this._name; }
  get Type() { return this._type; }
  get Tooltip() { return this._tooltip; }
  get IconType() { return this._iconType; }
  get Icon() { return this._icon; }
  get ActionType() { return this._actionType; }
  get Action() { return this._action; }
  get Params() { return this._params; }

  set Name(newName) {
    this._name = newName;
    if (this.OnValueChanged != null) this.OnValueChanged("Name", this);
    return this._name;
  }
  set Type(newType) {
    this._type = newType;
    if (this.OnValueChanged != null) this.OnValueChanged("Type", this);
    return this._type;
  }
  set Tooltip(newTooltip) {
    this._tooltip = newTooltip;
    if (this.OnValueChanged != null) this.OnValueChanged("Tooltip", this);
    return this._tooltip;
  }
  set IconType(newIconType) {
    this._iconType = newIconType;
    if (this.OnValueChanged != null) this.OnValueChanged("IconType", this);
    return this._iconType;
  }
  set Icon(newIcon) {
    this._icon = newIcon;
    if (this.OnValueChanged != null) this.OnValueChanged("Icon", this);
    return this._icon;
  }
  set ActionType(newActionType) {
    this._actionType = newActionType;
    if (this.OnValueChanged != null) this.OnValueChanged("ActionType", this);
    return this._actionType;
  }
  set Action(newAction) {
    this._action = newAction;
    if (this.OnValueChanged != null) this.OnValueChanged("Action", this);
    return this._action;
  }
  set Params(newParams) {
    this._params = newParams;
    if (this.OnValueChanged != null) this.OnValueChanged("Params", this);
    return this._params;
  }

  get OnValueChanged() { return this._onValueChanged; }
  set OnValueChanged(callback) { this._onValueChanged = callback; return this._onValueChanged; }

  dispose() {
    this._name = null; this._name = undefined;
    this._type = null; this._type = undefined;
    this._tooltip = null; this._tooltip = undefined;
    this._iconType = null; this._iconType = undefined;
    this._icon = null; this._icon = undefined;
    this._actionType = null; this._actionType = undefined;
    this._action = null; this._action = undefined;
    this._params = null; this._params = undefined;
    this._onValueChanged = null; this._onValueChanged = undefined;
  }

}
