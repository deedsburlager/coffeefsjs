//Use Mongoose
const mongoose = require('mongoose');
//SCHEMA the stuff on top right?
const CoffeeSchema = new mongoose.Schema({
    origin: String,
    think: String,
    created_at: { type: Date, default: Date.now },
    deleted: {type: Boolean, default: false},
});
const File = mongoose.model("File", CoffeeSchema);
//Question my need for this with MongoDB
File.countDocuments({}, function(err, count){
    if (err){
        throw err;
    }
    if(count > 0) return;
    const files = require('./file.seed.json');
    File.create(files, function(err, newFiles){
        if (err){
        }
        console.log("DB seeded")
    });
});
module.exports = File;