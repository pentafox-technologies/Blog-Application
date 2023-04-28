const db = require('../db');
const cerbos=require("./../middleware/cerbos");

exports.getAllSupport = async (req, res, next) => {
    try {
        const client = await db;
        await client.query(`SELECT * FROM "Supports"`);
        res.status(200).json({
            status: 'success',
        });
    } catch (err) {
    }
};

exports.createSupport = async (req, res, next) => {
    if(await cerbos.isAllowed(req.user, {resource: "supports"}, "create")) {
        try {
            const client = await db;
            const username = req.user.userName;
            const supportedTime = new Date();
            const slug = req.params.slug
            await client.query(`insert into "Supports" ("article", "user", "supportTime") values($1,$2,$3) RETURNING *`, [slug,username,supportedTime]);
            res.status(200).json({
                status: 'success',
                data:"support added"
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
        const client = await db;
        
        const allSupport = await client.query(`SELECT * FROM "Supports" where article like $1;`, [req.params.slug]);
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
        const client = await db;
        const queryResult = await client.query(`SELECT * FROM "Supports" where "user" = $1 and "article" = $2;`, [req.user.userName,req.params.slug]);
        const support = queryResult.rows[0];
        if (!support) {
            return res.status(404).json({
                status: 'error',
                data:{
                    data: 'Support not found'
                }
            });
        }
        await client.query(`DELETE FROM "Supports" WHERE "user"=$1 and "article" = $2`, [req.user.userName,req.params.slug]);
        res.status(200).json({
            status:"success",
            message : "removed support successfully"
        });
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