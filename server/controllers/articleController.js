const db = require('../db');
const slugify = require('slugify');

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

exports.getAllArticle=async (req, res, next) =>
{
    const client=await db.connect();
    try {
        const Articles=await client.query(`select * from "Article";`);
        res.status(201).json({
            status: 'success',
            data: Articles,
        });

    } catch(error) {
        console.log(error);
        res.status(400).json({
            status: 'error',
            message: error
        });
    }
};

exports.getArticle=async (req, res, next) =>
{
    const slug=req.params.slug;

    const client=await db.connect();
    try {
        const Articles=await client.query(`SELECT * FROM "Article" where slug like $1;`, [slug]);
        res.status(201).json({
            status: 'success',
            data: Articles,
        });
    } catch(error) {
        console.log(error);
        res.status(400).json({
            status: 'error',
            message: error
        });
    }
};

exports.updateArticle = (req, res, next) => {
    res.status(200).json({
        status: 'success'
    });
};

exports.deleteArticle=async (req, res, next) =>
{
    const slug=req.params.slug;

    const client=await db.connect();

    try {
        const Articles=await client.query(`DELETE FROM "Article" WHERE slug like $1;`, [slug]);
        res.status(204).json({
            status: 'success',
            data: Articles,
        });

    } catch(error) {
        console.log(error);
        res.status(400).json({
            status: 'error',
            message: error
        });
    }
};