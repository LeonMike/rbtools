'use babel';

import { Disposable } from 'atom';
import Button from "./Models/Button"
const fs = require("fs");

export default class Data extends Disposable {

  constructor() {
    super();

    this._buttons    = [];
    this._onMenuModelReload = null;
  }

  LoadConfiguration() {
    var filepath = atom.config.get('RBTools.menuModel');
    if (!filepath) {
      atom.notifications.addError('could not load configuration');
    } else {
      fs.readFile(filepath, (err, data) => {
        if (err) {
          atom.notifications.addError("Error (" + err.code + "): " + err.message, { dismissable: true })
          throw err;
        } else {
          var confJson = JSON.parse(data);
          var currentMenu = confJson[atom.config.get('RBTools.currentMenu')];
          if (currentMenu) {
            var it = 0;
            for (it = 0; it < this.Buttons.length; it++) {
              this.Buttons[it].dispose();
              this.Buttons[it] = null;
              this.Buttons[it] = undefined;
            }
            this.Buttons = [];
            for (it = 0, currBtn = currentMenu.Buttons[0]; it < currentMenu.Buttons.length; it++, currBtn = currentMenu.Buttons[it]) {
              this.Buttons.push(
                new Button(
                  currBtn.Name,
                  currBtn.Type,
                  currBtn.Tooltip,
                  currBtn.IconType,
                  currBtn.Icon,
                  currBtn.ActionType,
                  currBtn.Action,
                  currBtn.Params
                )
              );
            }
            if (this._onMenuModelReload != null) this.OnMenuModelReload(this);
            atom.notifications.addInfo("Loaded '" + filepath + "' for toolbar");
          } else {
            atom.notifications.addError("No configuration was loaded");
          }
        }
      });
    }
  }

  get ConfigFile() { return this._configFile; }
  get Buttons() { return this._buttons; }
  get OnMenuModelReload() { return this._onMenuModelReload; }

  set ConfigFile(newValue) { this._configFile; return this._configFile; }
  set Buttons(newValue) { this._buttons = newValue; return this._buttons; }
  set OnMenuModelReload(callback) { this._onMenuModelReload = callback; return this._onMenuModelReload; }

  dispose() {
    var it = 0;
    for (it = 0; it < this.Buttons.length; it++) {
      this.Buttons[it].dispose();
      this.Buttons[it] = null;
      this.Buttons[it] = undefined;
    }
    this.Buttons = [];
    this._configFile = undefined;
    this._onButtonsChanged = null;
    // TODO
  }
}
