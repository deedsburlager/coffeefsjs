//Fetch
function getFiles(){
    return fetch('/api/file')
    .then(response => response.json())
    .then(files => {
        console.log("Here they are:", files);
        return files;
    })
    .catch(error => console.error("GETFILES:", error));
};
//Render
function renderFiles(files){
    const listItems = files.map(file => `
    <li class="list-group-item">
        <strong>${file.title}</strong> - ${file.description}
    </li>`);
    const html = `<ul class="list-group">${listItems.join('')}</ul>`;

    return html;
}
//Display
function refreshFileList(){
    getFiles()
    .then(files => {
        const html = renderFiles(files);
        $('#list-container').html(html);
    });
}
//Buttons
function submitFileForm(){
    console.log("Submitted");
    const fileData = {
        title: $('#file-title').val(),
        description: $('#file-description').val(),
    };
    fetch('/api/file', {
        method: 'post',
        body: JSON.stringify(fileData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(file => {
        console.og("Posted", file);
        refreshFileList();
    })
    .catch(err => {
        console.error("Broken", err);
    })
    console.log("The data", fileData);
}

function cancelFileForm(){
    console.log("Clear");
}