const router = require('express').Router();
const mongoose = require('mongoose');
//From server.js What the server is doing.
//O CRUD
//Create
router.post('/file', function(req, res, next){
    const File = mongoose.model('File');
    const fileData = {
        origin: req.body.origin,
        think: req.body.think,
    };

    File.create(fileData, function(err, newFile){
        if(err){
            return res.status(500).json(err);
            return res.send("error", err);
        }
        res.json(newFile);
    });
});
//Read
router.get('/file/:fileId', function(req, res, next){
    const { fileId } = req.params;
    const file = FILES.find(entry => entry.id === fileId);
    if (!file) {
        return res.status(404).end(`Where did it go? '${fileId}'`);
    }
    res.json(file);
});
//Update
router.put('/file/:fileId', function(req, res, next){
    const File = mongoose.model('File');
    const fileId = req.params.fileId;
    File.findById(fileId, function(err, file){
        if (err){
            return res.status(500).json(err);
        }if(!file){
            return res.status(404).json({message: "File not found"});
        }
        file.origin = req.body.origin;
        file.think = req.body.think;
        file.save(function(err, savedFile){
            if (err){
                return res.status(500).json(err);
            }
            res.json(savedFile);
        })
    })
});
//Delete
router.delete('/file/:fileId', function(req, res, next){
    const File = mongoose.model('File');
    const fileId = req.params.fileId;

    File.findById(fileId, function(err, file){
        if(err){
            return res.status(500).json(err);
        }
        if (!file){
            return res.status(404).json({message: "File not Found"});
        }
        file.deleted = true;
        file.save(function(err, deletedFile){
            res.json(deletedFile);
        })
    })
});
//List while omitting deleted
router.get('/file', function(req, res, next){
    const File = mongoose.model('File');

    File.find({deleted: {$ne: true}}, function(err, files){
        if (err) {
            return res.status(500).json(err);
        }
        res.json(files);
});
});

//Call me here
module.exports = router;