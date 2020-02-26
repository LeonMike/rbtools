'use babel';

import RBTools from '../lib/Controllers/RBTools';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('RBTools', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('RBTools');
  });

  describe('when the RBTools:toggle event is triggered', () => {
    it('hides and shows the top bar', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('rb-tools')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'RBTools:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('rb-tools')).toExist();

        let RBToolsElement = workspaceElement.querySelector('rb-tools');
        expect(RBToolsElement).toExist();

        let RBToolsPanel = atom.workspace.panelForItem(RBToolsElement);
        expect(RBToolsPanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'RBTools:toggle');
        expect(RBToolsPanel.isVisible()).toBe(false);
      });
    });

  });
});
