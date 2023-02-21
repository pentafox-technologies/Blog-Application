const db = require('../db');

exports.getAllCategory = (req, res, next) => {
    console.log("category");
    res.status(200).json({
        status: 'success'
    });
};

exports.createCategory = (req, res, next) => {
    res.status(201).json({
        status: 'success'
    });
};

exports.createTopCategory = async (req, res, next) => {
    const client = await db.connect();
    const created =new Date();
    try {
        const newCategory = await client.query(`insert into "TopCategory" ("categoryName", "initializedBy","dateCreated") values($1,$2,$3) RETURNING *`, [req.body.categoryName,req.user.userName, created]);
        res.status(201).json({
            status: 'success',
            data: newCategory
        });
    } catch(err){
        console.log(err);
        res.status(400).json({
            status:'error',
            message: err
        });
    }
    res.status(201).json({
        status: 'success'
    });
};

exports.getCategory = (req, res, next) => {
    res.status(200).json({
        status: 'success',
        data: {
            data: req.params.slug
        }
    });
};

exports.updateCategory = (req, res, next) => {
    res.status(200).json({
        status: 'success'
    });
};

exports.deleteCategory = (req, res, next) => {
    res.status(204).json({
        status: 'success'
    });
};