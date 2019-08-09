const mongoose = require('mongoose');

const { Schema } = mongoose;

const Post = new Schema({
    tite: String,
    body: String,
    tags: [String],
    publishedDate: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('Post', Post);