'use babel';

import Data from '../Data.js';
import RBToolsButton from '../Views/RBTools-button';
import RBToolsView from '../Views/RBTools-view';
import ButtonModel from '../Models/Button';
import { CompositeDisposable } from 'atom';

export default {

  config: {
    menuModel: {
      type   : 'string',
      default: 'c:\\globals\\atom\\RBTools\\menuModel.json'
    },
    currentMenu: {
      type   : 'string',
      default: 'Basic Menu'
    }
  },

  RBToolsView: null,
  modalPanel: null,
  subscriptions: null,
  Data: null,

  createToolbar(toolbar_view) {
    var retVal = new toolbar_view();
    atom.RBTools.Data.OnMenuModelReload = function (params) {
      var tmp = atom.views.getView(RBToolsView);
      tmp.OnModelUpdated();
    }
    atom.RBTools.Data.LoadConfiguration();
    return retVal;
  },

  createButton(mdl_button) {
    var retVal = new RBToolsButton();
    retVal.set(mdl_button);
    return retVal;
  },

  activate(state) {
    // register views into provider
    atom.views.addViewProvider(RBToolsView.constructor, this.createToolbar);
    atom.views.addViewProvider(ButtonModel, this.createButton);

    // RBTools
    atom.RBTools = atom.RBTools || {};
    atom.RBTools.Data = new Data();

    this.RBToolsView = atom.views.getView(RBToolsView);
    //this.RBToolsView = atom.views.getView(RBToolsView);
    this.modalPanel = atom.workspace.addTopPanel({
      item: this.RBToolsView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'RBTools:toggle': () => this.toggle(),
      'RBTools:reload': () => atom.RBTools.Data.LoadConfiguration()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.RBTools.dispose();
    //this.RBToolsView.destroy();
  },

  serialize() {
    return "";
    /*return {
      RBToolsViewState: this.RBToolsView.serialize()
    };*/
  },

  toggle() {
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
    return true;
  }

};
