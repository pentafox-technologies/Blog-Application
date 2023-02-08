const db = require('../db');
exports.getAllUser = async (req, res, next) => {
    const client = await db.connect();
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

exports.getMe = async (req, res) => {
    try{
        const client = await db.connect();
        console.log("😎😎",req.user);
        const user = await client.query(`select * from "User" where "userName" = $1`, [req.user.userName]);
        if(user.rows.length == 0){
            return res.status(400).json({
                status:'error',
                message: 'No User found with that name'
            });
        }
        res.status(200).json({
            status: 'success',
            data: {
                user:user.rows
            },
        });

    } catch(err){
        console.log(err);
        res.status(400).json({
            status:'error',
            message: err
        });
    }
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