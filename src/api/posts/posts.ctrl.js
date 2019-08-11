const Post = require('models/post');
const Joi = require('joi');

const { ObjectId } = require('mongoose').Types;

exports.checkObjectId = (ctx, next) => {
    const { id } = ctx.params;
  
    if (!ObjectId.isValid(id)) {
      ctx.status = 400;
      return null;
    }
  
    return next();
};

// POST /api/posts
// {title, body, tags}

exports.write = async (ctx) => {
    const schema = Joi.object().keys({
        title: Joi.string().required(),
        body: Joi.string().required(),
        tags: Joi.array().items(Joi.string()).required()
    });

    const result = Joi.validate(ctx.request.body, schema);

    if(result.error) {
        ctx.status = 400;
        ctx.body = result.error;
        return;
    }
    
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

// GET /api/posts
exports.list = async (ctx) => {
    try {
        const posts = await Post.find().exec();
        ctx.body = posts;
    } catch(e) {
        ctx.throw(e, 500);
    }
};

// GET /api/posts/:id
exports.read = async (ctx) => {
    const { id } = ctx.params;
    try {
        const post = await Post.findById(id).exec();

        if(!post) {
            ctx.status = 404;
            return;
        }

        ctx.body = post;
    } catch(e) {
        ctx.throw(e, 500);
    }
};

// DELETE /api/posts/:id
exports.remove = async (ctx) => {
    const { id } = ctx.params;
    try {
        await Post.findByIdAndRemove(id).exec();
        ctx.status = 204;
    } catch(e) {
        ctx.throw(e, 500);
    }
};

// PATCH /api/posts/:id
// { title, body, tags }
exports.update = async (ctx) => {
    const { id } = ctx.params;
    try {
        const post = await Post.findByIdAndUpdate(id, ctx.request.body, {
            new: true
        }).exec();

        if(!post) {
            ctx.status = 404;
            return;
        }
        ctx.body = post;
    } catch(e) {
        ctx.throw(e, 500);
    }
};

