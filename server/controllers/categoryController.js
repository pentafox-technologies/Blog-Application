const db = require('../db');
const cerbos = require("./../middleware/cerbos");

exports.getAllCategory = async (req, res, next) => {
    try{
        const client = await db;
        const categories = await client.query(`select "categoryName" from "TopCategory"`);
        res.status(200).json({
            status: 'success',
            data: categories.rows,
        });
    } catch (err) {
        res.status(400).json({
            status:'error',
            message: err
        });
    }
    
};

exports.getAllSubCategory = async (req, res, next) => {
    try{
        const client = await db;
        const cat = await client.query(`select "catName" from "CategorySet"`);
        let categories = new Array();
        for(var i=0;i<cat.rows.length;++i){
            if(!categories.includes(cat.rows[i].catName)) {
                categories.push(cat.rows[i].catName);
            }
        }
        res.status(201).json({
            status: 'success',
            data: categories,
        });
    } catch (err) {
        res.status(400).json({
            status:'error',
            message: err
        });
    }
    
};

exports.createTopCategory = async (req, res, next) => {
    const client = await db;
    if(await cerbos.isAllowed(req.user,{resource:"category"},"create")) {
        try {
            const newTopCategory = await client.query(`insert into "TopCategory" ("categoryName", "initializedBy", "dateCreated") values($1,$2,$3) RETURNING *`, [req.body.categoryName,req.user.userName,new Date()]);
            res.status(201).json({
                status: 'success',
                data: newTopCategory.rows,
            });
        } catch (err) {
            res.status(400).json({
                status:'error',
                message: err
            });
        }
    }
    else{
        res.status(400).json({
            message:'access denied',
        });
    }
};


exports.getCategory=async (req, res, next) =>
{
    try {
        const client=await db;
        req.params.categoryName=req.params.categoryName+"%";
        var subCat=await client.query(`select * from "CategorySet" where "categorizedUnder" ilike $1`, [req.params.categoryName]);
        var articles=new Array();

        if(subCat.rows.length==0){
            var article=await client.query(`select "article" from "CategoryMap" where "category" ilike $1`, [req.params.categoryName]);
            for(var i=0;i<article.rows.length;i++){
                const article1=await client.query(`select * from "Article" where "slug" = $1`, [article.rows[i].article]);
                    if(!articles.includes(article1.rows[0])) {
                        articles.push(article1.rows[0]);
                    }
            }
        }
        else{
            for(var i=0;i<subCat.rows.length;i++) {
                var cat=await client.query(`select * from "CategoryMap" where "category" ilike $1`, [subCat.rows[i].catName]);

                for(var j=0;j<cat.rows.length;j++) {
                    const article=await client.query(`select * from "Article" where "slug" = $1`, [cat.rows[j].article]);
                    if(!articles.includes(article.rows[0])) {
                        articles.push(article.rows[0]);
                    }
                }
            }
        }
        
        res.status(200).json({
            status: 'success',
            data: {
                data: articles
            }
        });

    } catch(error) {
        res.status(400).json({
            status: 'failed',
            Error: {error}
        });

    }
};



exports.updateCategory = async (req, res) => {
    if(await cerbos.isAllowed(req.user,{resource:"category"},"update")) {
        try {
            const client = await db;

            const topCategory = await client.query(`SELECT * FROM "TopCategory" where "categoryName" = $1;`, [req.params.categoryName]);

            // Check whether article exist or not
            if(topCategory.rowCount<=0) {
                return res.status(200).json({
                    status: 'Request failed',
                    message: 'TopCategory not found',
                });
            }
            
            await client.query('ALTER TABLE "TopCategory" DISABLE TRIGGER ALL');

            await client.query('UPDATE "TopCategory" SET "categoryName" = ($1) WHERE "categoryName" = ($2)',[req.body.newCategory,req.params.categoryName]);
            
            await client.query('UPDATE "CategorySet" SET "categorizedUnder" = ($1) WHERE "categorizedUnder" = ($2)',[req.body.newCategory,req.params.categoryName]);
            
            await client.query('ALTER TABLE "TopCategory" ENABLE TRIGGER ALL');

        
            res.status(200).json({
                status: 'success',
                message: 'Top Category Updated'
            });
        } catch(err) {
            res.status(400).json({
                status:'error',
                message: err
            });
        }
    }
    else{
        res.status(400).json({
            message:'access denied',
        });
    }
};