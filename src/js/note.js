const APP_URL = 'http://localhost:3000/api',
noteContainer = document.querySelector('.note-container');

const noteEl = (title,content) => {
    const note = document.createElement('div');
    note.className = 'note';
    note.innerHTML = `
    <div class="note-header">
        <h2>${title}</h2>
    </div>
    <div class="note-body">
        ${content}
    </div>
    `;
    noteContainer.append(note);
} 

export async function loadNote() {
    try {
        const uuid = await checkUser();
        const response = await fetch(`${APP_URL}/notes/${uuid}`);
        const dataNotes = await response.json(); // Asumsi bahwa `response` adalah JSON

        noteContainer.innerHTML = '';
        let notes = dataNotes.users[uuid].notes;

        console.log(notes);
        
        
        if(notes.length > 0){
            notes.forEach(note => {
                noteEl(note.id, note.content);
            });
        }
    } catch (error) {
        console.error(error);
    }
}

export async function saveNote(uuid,content) {
    fetch(`${APP_URL}/notes`,{
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            uuid,
            content,
        }),
    })
    .then(response => response.json())
    .then(() => {
        alert('berhasil simpan');
    })
    .catch(error => {
        console.error(error);
    });
}

export async function deleteNote() {
    
}

async function checkUser(){
    let userUUID = localStorage.getItem("userUUID");
    if (!userUUID) {
        try {
            const response = await fetch(`${APP_URL}/user`);
            const data = await response.json();
            userUUID = data;
            localStorage.setItem('userUUID', userUUID);
        } catch (error) {
            console.error(error);
        }
    }
    return userUUID;
}
