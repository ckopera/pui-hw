let notecards = new Set();
let notecardList = document.querySelector("#notecard-list");

class Notecard {
    constructor(imgURL, title, body) {
        this.noteImgURL = imgURL;
        this.noteTitle = title;
        this.noteBody = body;
    }
}

function addNewNote(imgURL, title, body){
    let notecard = new Notecard("img", "title", "body");
    notecards.add(notecard);
    return notecard;
}

function createNewNotecard(notecard){
    console.log("creating new notecard");
    console.log(notecard);
    let template = document.getElementById("#notecard-template")
    let clone = template.content.cloneNode(true);
    let notecardClone = clone.querySelector("notecard");
    
    let title = notecardClone.querySelector("note-title")
    let body = notecardClone.querySelector("note-body")
    let img = notecardClone.querySelector("notecard-thumbnail")

    title.innerText = notecard.noteTitle;
    body.innderText = notecard.noteBody;
    img.srx = notecard.noteImgURL;

    notecardList.appendChild(notecardClone);

    notecard.element = notecardClone;
}

function deleteNote(notecard) {
    notecard.element.remove();
}


let notecardOne = addNewNote("assets/warhol.png", "title 1", "body 1");
let notecardTwo = addNewNote("assets/warhol-tiger.png", "title 2", "body 2");

for (let notecard of notecards){
    createNewNotecard(notecard);
}