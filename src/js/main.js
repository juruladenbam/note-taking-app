import "quill/dist/quill.snow.css";
import '../style.css';
import { loadNote, saveNote, deleteNote } from './note.js';
import Quill from "quill/core";

import Toolbar from "quill/modules/toolbar";
import Snow from "quill/themes/snow";

import Bold from "quill/formats/bold";
import Italic from "quill/formats/italic";
import Header from "quill/formats/header";

const 
mainPage = document.querySelector('.main-page'),
otherPage = document.querySelector('.other-page'),
searchInput = document.getElementById('search'),
categooryEl = document.querySelectorAll('.category'),
btnNew = document.getElementById('btnNew'),
btnBack = document.getElementById('btnBack');
let quill,
uuid = localStorage.getItem('userUUID');

otherPage.style.display = 'none';

document.addEventListener("DOMContentLoaded",loadNote());

btnNew.addEventListener('click', () => {
  mainPage.style.display = 'none';
  otherPage.style.display = 'block';
  initTextEditor();
});

btnBack.addEventListener('click', () => {
  mainPage.style.display = 'block';
  otherPage.style.display = 'none';
  loadNote()
});

function initTextEditor() {
  if(!quill){
    Quill.register({
      "modules/toolbar": Toolbar,
      "themes/snow": Snow,
      "formats/bold": Bold,
      "formats/italic": Italic,
      "formats/header": Header,
    });
  
    quill = new Quill("#editor", {
      theme: "snow",
      modules: {
        toolbar: [
          ['bold', 'italic'],
          ['link', 'blockquote', 'code-block', 'image'],
          [{ list: 'ordered' }, { list: 'bullet' }],
        ],
      },
    });
  }
    
  document.querySelector('#btnSave').addEventListener('click', function(){
    const content = quill.getContents(); 
    const contentHtml = quill.root.innerHTML;
    saveNote(uuid,contentHtml)
  });

}



