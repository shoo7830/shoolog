const Post = require('models/post');

// POST /api/posts
// {title, body, tags}

exports.write = async (ctx) => {
    const { title, body, tags } = ctx.request.body;
    
    const post = new Post({
        title, body, tags
    });

    try {
        await post.save();
        ctx.body = post;
    } catch(e) {
        ctx.throw(e, 500);
    }
};

exports.list = (ctx) => {

};

exports.read = (ctx) => {

};

exports.remove = (ctx) => {

};

exports.update = (ctx) => {

};

