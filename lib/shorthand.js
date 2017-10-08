'use babel';

import ShorthandView from './shorthand-view';
import { CompositeDisposable } from 'atom';

export default {

  shorthandView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.shorthandView = new ShorthandView(state.shorthandViewState);

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'shorthand:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    //this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.shorthandView.destroy();
  },

  serialize() {
    return {
      shorthandViewState: this.shorthandView.serialize()
    };
  },

  toggle() {

    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      let text = editor.getSelectedText();
      let replacementText = this.analyzeText(text);
      editor.insertText(replacementText);
    }
  },

  analyzeText(text) {

},
  //switch statement
  compSwitch(arg, numCase){
    let cases = ""
    let begin = "switch(" + arg + ")\n{\n"
    for(let i = 0;i<numCase;i++){
      cases = cases + "\tcase "+ i.toString() +":\n\t\t\n\t\tbreak;\n"
    }
    return begin + cases + "\tdefault:\n\n}\n\n"
  },

  //quick print line
  print(){
    return "System.out.println("");"
  },
  //----------------- Default var names ------------------//
  //For default java main class
  forMainClass(name){
    return "class " + name + "\n{\n\tpublic static void main(String args[])\n\t\t{\n//insert code here\n\t\t}\n}";
  },
  //for public classes with cunstructors
  forPublicContstructorClass(name){
    return "public class " + name + "\n{\n\tpublic" + name + "()\n\t{\n\t//insert code here \n\t}\n\\insert more methods here\n}"
  },
  //Simple for loop from start to end, i is default var
  forExact(start,end){
    return "for( int i = " + start + "; i < " + end + "; i++)\n{\n\n}\n"
  },
  //simple for loop from 0 to the end, i default var
  forZero(end){
    return "for( int i = 0; i < " + end + "; i++)\n{\n\n}\n"
  },
  //Decrementing forms
  negForExact(start,end){
    return "for( int i = " + start + "; i >= " + end + "; i--)\n{\n\n}\n"
  },
  //Decrementing forms
  negForZero(end){
    return "for( int i = " + end + "; i >= 0; i--)\n{\n\n}\n"
  },
  //------------ using custom var Names ---------------//
  forExactVar(start, end, varName){
    return "for( int " + varName + " = " + start + "; " + varName + " < " + end + "; " + varName + "++)\n{\n\n}\n"
  },

  forZeroVar(end, varName){
    return "for( int " + varName + " = 0 ; " + varName + " < " + end + "; " + varName + "++)\n{\n\n}\n"
  },

  negForExactVar(start, end, varName){
    return "for( int " + varName + " = " + start + "; " + varName + " >= " + end + "; " + varName + "--)\n{\n\n}\n"
  },

  negForZeroVar(end, varName){
    return "for( int " + varName + " = " + end + "; " + varName + " >= 0; " + varName + "--)\n{\n\n}\n"
  },

  forCondition(start, conditionalStatement, update, varName){
      return "for( int = " + varName + "; " + conditionalStatement + "; " + update + ")\n{\n\n}\n"
  },

};
