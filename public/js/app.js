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
        discription: data.description || '',
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

//Clear the Form on Page load
$(document).ready(function(){
    refreshFileList();
    setForm();
});