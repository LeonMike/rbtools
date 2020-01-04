'use babel';

import Data from '../Data.js';
import RbtoolsButton from '../Views/rbtools-button';
import RbtoolsView from '../Views/rbtools-view';
import ButtonModel from '../Models/Button';
import { CompositeDisposable } from 'atom';

export default {

  config: {
    menuModel: {
      type   : 'string',
      default: 'c:\\globals\\atom\\rbtools\\menuModel.json'
    },
    currentMenu: {
      type   : 'string',
      default: 'Basic Menu'
    }
  },

  rbtoolsView: null,
  modalPanel: null,
  subscriptions: null,
  Data: null,

  createToolbar(toolbar_view) {
    var retVal = new toolbar_view();
    atom.rbtools.Data.OnMenuModelReload = function (params) {
      var tmp = atom.views.getView(RbtoolsView);
      tmp.OnModelUpdated();
    }
    atom.rbtools.Data.LoadConfiguration();
    return retVal;
  },

  createButton(mdl_button) {
    var retVal = new RbtoolsButton();
    retVal.set(mdl_button);
    return retVal;
  },

  activate(state) {
    // register views into provider
    atom.views.addViewProvider(RbtoolsView.constructor, this.createToolbar);
    atom.views.addViewProvider(ButtonModel, this.createButton);

    // rbtools
    atom.rbtools = atom.rbtools || {};
    atom.rbtools.Data = new Data();

    this.rbtoolsView = atom.views.getView(RbtoolsView);
    //this.rbtoolsView = atom.views.getView(RbtoolsView);
    this.modalPanel = atom.workspace.addTopPanel({
      item: this.rbtoolsView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'rbtools:toggle': () => this.toggle(),
      'rbtools:reload': () => atom.rbtools.Data.LoadConfiguration()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.rbtools.dispose();
    //this.rbtoolsView.destroy();
  },

  serialize() {
    return "";
    /*return {
      rbtoolsViewState: this.rbtoolsView.serialize()
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
