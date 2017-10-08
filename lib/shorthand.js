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
      let newText = text.trim();

      if(newText == "insertionSort"){
        return this.insertionSort()
      }

      if(newText == "bubbleSort"){
        return this.bubbleSort()
      }

      //Creating a publicClass
      //format: publicClass nameOfClass
      let length = "publicClass".length;
      if(newText.substring(0,length) == "publicClass"){
        let nameOfClass = newText.substring(length, newText.length);
        return this.publicClass(nameOfClass);
      }
      //Nested For loops
      length = "nest loops".length
      if(newText.substring(0, length) == "nest loops"){
          let temp = newText.substring(length+1).trim()
          let end = temp.substring(0, temp.indexOf(" ")) // size of loop
          let size = temp.substring(end.length).trim() //amount of nestLoops
          //check before hand to see if end and size are actually a number

          return this.nestLoops(end, parseInt(size))
      }

      //Creating a mainClass
      //format: mainClass nameOfClass
      length = "mainClass".length;
      if(newText.substring(0,length) == "mainClass"){
        let nameOfClass = newText.substring(length, newText.length);
        return this.mainClass(nameOfClass);
      }

      //Creating a compSwitch
      //format: compSwitch argument numOfCases
      length = "switch".length;
      if(newText.substring(0,length) == "switch"){
        newText = text.substring(length, newText.length);
        newText = newText.trim();
        let argument = newText.substring(0, newText.search(" "));
        let numOfCases = newText.substring(newText.search(" ")+1, newText.length);
        return this.compSwitch(argument, numOfCases);
      }

      // //Creating a forExact or forZero
      length = "for".length;
      if(text.substring(0,length) == "for"){

      }

      return text;
  },

  // case 1: publicClass
  publicClass(className){
    let replace =
    "public class " + className + "\n{\n\tpublic " + className + "()\n\t\t{\n\n\t\t}\n \tpublic " + className +"(String name)\n\t\t{\n\n\t\t}\n}\n\n";
    return replace;
  },
  //case 2: default java class.
  //For default java main class
  mainClass(name){
    return "class " + name + "\n{\n\tpublic static void main(String args[])\n\t\t{\n//insert code here\n\t\t}\n}";
  },

  //switch statement.
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
    return "System.out.println(\"\");"
  },

  //----------------- Default var names ------------------//
  //Simple for loop from start to end, i is default var
  forExact(start,end){
    if(parseInt(start) > parseInt(end))
      return "for( int i = " + start + "; i < " + end + "; i++)\n{\n\n}\n"
    else if(parseInt(start) < parseInt(end))
      return "for( int i = " + start + "; i >= " + end + "; i--)\n{\n\n}\n"
  },

  //simple for loop from 0 to the end, i default var
  forZero(end){
    if(parseInt(end) > 0)
      return "for( int i = 0; i < " + end + "; i++)\n{\n\n}\n"
    else if(parseInt(end) < 0)
      return "for( int i = " + end + "; i >= 0; i--)\n{\n\n}\n"
  },

  //nested for loops
  nestLoops(end, numOfLoops){
    if(numOfLoops < 122){//dont more than 122 nested for loops
      let text = "for( int a = 0; a < " + end + "; a++)\n{\n\n"
      let startChar = 98 // next one will be 'b'
      let tabCounter = "\t"
      let bracketCounter = "}\n"
      for(let i = 0; i < numOfLoops; i++){
        let currentChar = String.fromCharCode(startChar + i)
        text += tabCounter+"for( int " + currentChar + " = 0; " + currentChar + " < " + end + "; " + currentChar + "++)\n" + tabCounter + "{\n\n" + tabCounter + "\n"
        bracketCounter = tabCounter+"}\n"+bracketCounter
        tabCounter += "\t"
      }
      text += bracketCounter

      return text
    }else
      return "Exceeded Loop Limit"
  },

  //------------ using custom var Names ---------------//
  forExactVar(start, end, varName){
    if(parseInt(start) > parseInt(end))
      return "for( int " + varName + " = " + start + "; " + varName + " < " + end + "; " + varName + "++)\n{\n\n}\n"
    else if(parseInt(start) < parseInt(end))
      return "for( int " + varName + " = " + start + "; " + varName + " >= " + end + "; " + varName + "--)\n{\n\n}\n"
  },

  forZeroVar(end, varName){
    if(parseInt(end) > 0)
      return "for( int " + varName + " = 0 ; " + varName + " < " + end + "; " + varName + "++)\n{\n\n}\n"
    else if(parseInt(end) < 0)
      return "for( int " + varName + " = " + end + "; " + varName + " >= 0; " + varName + "--)\n{\n\n}\n"
  },

  //--------------- Sorting algorithms ----------------//
  insertionSort(){
    let text = "void sort(int arr[])\n{\n\tint n = arr.length;\n\tfor (int i=1; i<n; ++i)\n\t{\n\t\tint key = arr[i];\n\t\t"+
      "int j = i-1;\n\t\twhile (j>=0 && arr[j] > key)\n\t\t{\n\t\t\tarr[j+1] = arr[j];\n\t\t\tj = j-1;\n\t\t}\n\t\tarr[j+1] = key;\n\t}\n}";
    return text;
  },
  // bubble sort
  bubbleSort(){
    let sort =
    "void bubbleSort(int arr[])\n" +
    "{\n"+
    "\t\tint n = arr.length;\n"+
    "\t\tfor (int i = 0; i < n-1; i++)\n"+
    "\t\t{\n" +
    "\t\t\tfor (int j = 0; j < n-i-1; j++)\n"+
    "\t\t\t{\n"+
    "\t\t\t\tif (arr[j] > arr[j+1])\n"+
    "\t\t\t\t\t{\n"+
    "\t\t\t\t\t\tint temp = arr[j];\n"+
    "\t\t\t\t\t\tarr[j] = arr[j+1];\n"+
    "\t\t\t\t\t\tarr[j+1] = temp;\n"+
    "\t\t\t\t\t}\n"+
    "\t\t\t}\n"+
    "\t\t}\n"+
    "}\n"
    return sort
  },
};
