//Fetch
function getFiles(){
    return fetch('/api/file')
    .then(response => response.json())
    .then(files => {
        console.log("I found goodies:", files);
        return files;
    })
    .catch(error => console.error("GETFILES:", error));
};
//Render
function renderFiles(files){
    const listItems = files.map(file => `
    <li class="list-group-item">
        <strong>${file.title}</strong> - ${file.description}
        <span class="pull-right">
        <button type="button" class="btn btn-xs btn-default" onclick="handleEditFileClick(this)" data-file-id="${file._id}">Edit</button>
        <button type="button" class="btn btn-xs btn-defualt" onclick="handleDeleteFileClick(this)" data-file-id="${file._id}">Delete</button>
        </span>
    </li>`);
    const html = `<ul class="list-group">${listItems.join('')}</ul>`;

    return html;
}
//Display
function refreshFileList(){
    getFiles()
    .then(files => {
        window.fileList = files;
        const html = renderFiles(files);
        $('#list-container').html(html);
    });
}

//Clear form
function setForm(data){
    data = data || {};

    const file = {
        title: data.title || '',
        description: data.description || '',
        _id: data._id || '',
    };

    $('#file-title').val(file.title);
    $('#file-description').val(file.description);
    $('#file-id').val(file._id);
    if (file._id){
        $('#form-label').text("Edit");
    }else{
        $('#form-label').text("Add");
    }
}
//Buttons
function submitFileForm(){
    console.log("Submitted");
    const fileData = {
        title: $('#file-title').val(),
        description: $('#file-description').val(),
        _id: $('#file-id').val(),
    };
console.log("fileData", JSON.stringify(fileData))
    //Var to hold the new route based on _id
    let method, url;
    if (fileData._id){
        method = 'PUT';
        url = '/api/file/' + fileData._id;
    }else{
        method = 'POST';
        url = '/api/file';
    }
    fetch(url, {
        method: method,
        body: JSON.stringify(fileData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(file => {
        console.log("Posted", file);
        setForm();
        refreshFileList();
    })
    .catch(err => {
        console.error("Broken", err);
    })
    console.log("The data", fileData);
}

function cancelFileForm(){
    setForm();
}

function handleEditFileClick(element){
    const fileId = element.getAttribute('data-file-id');
    const file = window.fileList.find(file => file._id === fileId);
    if (file){
        setForm(file)
    }
}

function handleDeleteFileClick(element){
    const fileId = element.getAttribute('data-file-id');

    if (confirm("Really?")){
        deleteFile(fileId);
    }
}
// Delete Function
function deleteFile(fileId){
    const url = '/api/file/' + fileId;

    fetch(url, {
        method: 'DELETE',
        headers: {'Content-Type': 'appliation/json'}
    })
    .then(response => response.json())
    .then(response => {
        refreshFileList();
    })
    .catch(err => {
        console.error("In need of Resurrection", err);
    });
}

//Clear the Form on Page load
$(document).ready(function(){
    refreshFileList();
    setForm();
});