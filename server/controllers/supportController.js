const db = require('../db');

exports.getAllSupport = async (req, res, next) => {
    try {
        const client = await db.connect();
        const allSupports = await client.query(`SELECT * FROM "Supports"`);
        res.status(200).json({
            status: 'success',
            data:{
                data:allSupports.rows
            }
        });
    } catch (err) {
    }
};

exports.createSupport = async (req, res, next) => {
    if(await cerbos.isAllowed(req.user, {resource: "supports"}, "create")) {
        try {
            const client = await db.connect();
            const username = req.user.username;
            const article = await client.query(`SELECT * FROM "Article" WHERE "slug"=${slug}`);
            const supportedTime = new Date.now();
            const newSupport = await client.query(`INSERT INTO "Supports" ("article", "user", "supportTime") VALUES (${username}, ${article}, ${supportedTime})`);
            res.status(200).json({
                status: 'success',
                data: newSupport.rows
            });
        } catch (err) {
            res.status(500).json({
                status: 'error',
                data:{
                    err:err.message
                }
            });
        }
    }
    else{
        res.status(400).json({
            message:'access denied',
        });
    }
    
};

exports.getSupport = async (req, res, next) => {
    try {
        const client = db.connect();
        
        const allSupport = client.query(`SELECT * FROM "Support" WHERE "article"=${req.params.slug}`);

        res.status(200).json({
            status: 'success',
            data: {
                data: allSupport.rows
            }
        });
    } catch (err) {
        res.status(500).json({
            status:"error",
            data: {
                err: err.message
            }
        });
    }
};


exports.deleteSupport = async (req, res, next) => {
    try{
        const client = await db.connect();
        const queryResult = await client.query(`SELECT * FROM "Support" WHERE "article"=${req.params.slug} AND "user"=${req.user.username}`);
        const support = queryResult.rows[0];
        if (!support) {
            return res.status(404).json({
                status: 'error',
                data:{
                    data: 'Support not found'
                }
            });
        }
        await client.query(`DELETE FROM "Support" WHERE "article"=${req.params.slug} AND "user"=${req.user.username}`);
    }
    catch(err){
        res.status(404).json({
            status: 'error',
            data:{
                err: err.message
            }
        });
    }
};