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
        const categories = req.body.category.split(" ");     
        let slug = slugify(req.body.title, { lower: true }) + Math.random().toString(36).slice(2);
        while(true){
            temp = await client.query(`select * from "Article" where slug like '${slug}'`);
            if(temp.rows.length>0){
                slug = slugify(req.body.title, { lower: true }) + Math.random().toString(36).slice(2);
            }
            if(temp.rows == 0){
                break;
            }
        }
        const status = "draft";
        const visibilty = "private";
        // const newArticle = await client.query(`insert into "Article" ("slug", "author","title","content","status","visibility") values($1,$2,$3,$4,$5,$6) RETURNING *`, [slug,req.body.author,req.body.title, req.body.content, status, visibilty]);
        for(let i=0;i<categories.length;i++){
            const created =new Date();
            let checkcategory = await client.query(`select * from "CategorySet" where "catName" like '${categories[i]}'`);
            if(checkcategory.rows.length == 0){
                let categorizedUnder = "Other"
                let newCategory = await client.query(`insert into "CategorySet" ("catName", "categorizedUnder", "initializedBy", "dateCreated") values($1,$2,$3,$4) RETURNING *`, [categories[i],categorizedUnder,req.user.userName,created ]);
            }
        }
        res.status(201).json({
            status: 'success',
            // data: newArticle
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