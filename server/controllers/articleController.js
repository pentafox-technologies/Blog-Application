const db = require('../db');
const slugify = require('slugify');

exports.getAllArticle = (req, res, next) => {
    res.status(200).json({
        status: 'success'
    });
};

exports.createArticle = async (req, res) => {
    const client = await db.connect();
    try{                                       
        console.log(req.body);                                                                           
        const slug = slugify(req.body.title, { lower: true });
        const status = "draft"
        const visibilty = "private";
        const newArticle = await client.query(`insert into "Article" ("slug", "author","title","content","status","visibility") values($1,$2,$3,$4,$5,$6) RETURNING *`, [slug,req.body.author,req.body.title, req.body.content, status, visibilty]);
        res.status(201).json({
            status: 'success',
            data: newArticle,
        });
    } catch(err){
        console.log(err);
        res.status(400).json({
            status:'error',
            message: err
        });
    }
};

exports.getArticle = (req, res, next) => {
    res.status(200).json({
        status: 'success',
        data: {
            data: req.params.slug
        }
    });
};

exports.updateArticle = (req, res, next) => {
    res.status(200).json({
        status: 'success'
    });
};

exports.deleteArticle = (req, res, next) => {
    res.status(204).json({
        status: 'success'
    });
};