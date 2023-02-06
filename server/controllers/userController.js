const db = require('../db');
exports.getAllUser = async (req, res, next) => {
    const client = await db.connect();
    const a = new Date();
    const b = new Date();
    try{
        const users = await client.query(`SELECT * FROM "User"`);
        res.status(200).json({
            status: 'success',
            data: users.rows,
        });
    } catch(err){
        console.log(err);
    }
}
exports.createUser = (req, res, next) => {
    res.status(201).json({
        status: 'success'
    });
};

exports.getUser = (req, res, next) => {
    res.status(200).json({
        status: 'success',
        data: {
            data: req.params.slug
        }
    });
};

exports.updateUser = (req, res, next) => {
    res.status(200).json({
        status: 'success'
    });
};

exports.deleteUser = (req, res, next) => {
    res.status(204).json({
        status: 'success'
    });
};