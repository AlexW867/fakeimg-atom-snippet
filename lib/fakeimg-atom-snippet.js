'use babel';

import FakeimgAtomSnippetView from './fakeimg-atom-snippet-view';
import { CompositeDisposable } from 'atom';

export default {

  fakeimgAtomSnippetView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.fakeimgAtomSnippetView = new FakeimgAtomSnippetView(state.fakeimgAtomSnippetViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.fakeimgAtomSnippetView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'fakeimg-atom-snippet:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.fakeimgAtomSnippetView.destroy();
  },

  serialize() {
    return {
      fakeimgAtomSnippetViewState: this.fakeimgAtomSnippetView.serialize()
    };
  },

  toggle() {
    console.log('FakeimgAtomSnippet was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
