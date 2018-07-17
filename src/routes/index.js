const router = require('express').Router();
const mongoose = require('mongoose');
//From server.js What the server is doing.
//O CRUD
//Create
router.post('/file', function(req, res, next){
   const File = mongoose.model('File');
   const fileData = {
       title: req.body.title,
       description: req.body.description,
   };

   File.create(fileData, function(err, newFile){
       if(err){
           console.error(err);
           return res.status(500).json(err);
       }
       res.json(newFile);
    });
});
//Read
router.get('/file/:fileId', function(req, res, next){
    const { fileId } = req.params;
    const file = FILES.find(entry => entry.id === fileId);
    if (!file) {
        return res.status(404).end(`Could not find file '${fileId}'`);
    }
    res.json(file);
});
//Update
router.put('/file/:fileId', function(req, res, next){
    const data = req.body;
    console.log("PUT DATA", data);
    res.end('Update `${req.params.fileId}`');
});
//Delete
router.delete('/file/:fileId', function(req, res, next){
    res.end('Delete `${req.params.fileId}`');
});
//List
router.get('/file', function(req, res, next){
    mongoose.model('File').find({}, function(err, files){
        if (err) {
            console.log(err);
            return res.status(500).json(err);
        };
        res.json(files);
})
});

//Call me here
module.exports = router;