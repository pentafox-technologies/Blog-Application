const db=require('../db');
const bcrypt=require("bcryptjs");
const cerbos=require("./../middleware/cerbos");

exports.getAllUser=async (req, res, next) =>
{
    const client=await db.connect();
    if(await cerbos.isAllowed(req.user,{resource:"user"},"getAll")) {
            try {
            const users=await client.query(`SELECT * FROM "User"`);
            res.status(200).json({
                status: 'success',
                data: users.rows,
            });
        } catch(err) {
            console.log(err);
        }
    }
    else{
        res.status(400).json({
            message:'access denied',
        });
    }
}

exports.getUser=async (req, res, next) =>
{
    try {
        const name=req.params.slug;
        const client=await db.connect();
        const user=await client.query(`select * from "User" where "userName" = $1`, [name])

        if(user.rows.length==0) {
            return res.status(404).json({
                status: 'error',
                message: "No user found with this name"
            })
        }
        res.status(200).json({
            status: 'success',
            data: {
                user: user.rows
            },
        });
    } catch(error) {
        console.log(error);
        res.status(400).json({
            status: "error",
            message: error
        })
    }

};

exports.getMe=async (req, res) =>
{
    if(await cerbos.isAllowed(req.user,{resource:"user"},"getByUserName")) {
            try {
            const client=await db.connect();
            console.log("😎😎", req.user);
            const user=await client.query(`select * from "User" where "userName" = $1`, [req.user.userName]);
            if(user.rows.length==0) {
                return res.status(400).json({
                    status: 'error',
                    message: 'No User found with that name'
                });
            }
            res.status(200).json({
                status: 'success',
                data: {
                    user: user.rows
                },
            });

        } catch(err) {
            console.log(err);
            res.status(400).json({
                status: 'error',
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

exports.updateUser=async (req, res, next) =>
{
    if(await cerbos.isAllowed(req.user,{resource:"user", userName: req.params.slug},"update")) {
            try {
                const user=req.body;
                const client=await db.connect();
                const update=await client.query(`update "User" set "firstName"=$1 where "userName" = $2`, [user.firstName, req.params.slug]);

                res.status(200).json({
                    status: 'success',
                    data: update
                });
            } catch(error) {
                console.log(error);
                res.status(400).json({
                    status: 'error',
                    message: error
                });
            }
    }
    else{
        res.status(400).json({
            message:'access denied',
        });
    }
};


exports.updatePassword=async (req, res, next) =>
{
    if(await cerbos.isAllowed(req.user,{resource:"user", userName: req.params.slug},"update")) {
            try {
                const client=await db.connect();
                const password=await bcrypt.hash(req.body.password, 12);
                const update=await client.query(`update "User" set "password"=$1 where "userName" = $2`, [password, req.params.slug]);

                res.status(200).json({
                    status: 'success',
                    data: update
                });
            } catch(error) {
                console.log(error);
                res.status(400).json({
                    status: 'error',
                    message: error
                });
            }
    }
    else{
        res.status(400).json({
            message:'access denied',
        });
    }
    
};

exports.updateProfile=async (req, res, next) =>
{
    if(await cerbos.isAllowed(req.user,{resource:"user", userName: req.params.slug},"update")){
            try {
                const client=await db.connect();
                const update=await client.query(`update "User" set "password"=$1 where "userName" = $2`, [req.body.profilePic, req.params.slug]);

                res.status(200).json({
                    status: 'success',
                    data: update
                });
            } catch(error) {
                console.log(error);
                res.status(400).json({
                    status: 'error',
                    message: error
                });
            }
    }
    else{
        res.status(400).json({
            message:'access denied',
        });
    }
};

exports.updateMail=async (req, res, next) =>
{
    if(await cerbos.isAllowed(req.user,{resource:"user", userName: req.params.slug},"update"))
    {
            try {
                const client=await db.connect();
                const update=await client.query(`update "User" set "emailAddress"=$1 where "userName" = $2`, [req.body.emailAddress, req.params.slug]);

                res.status(200).json({
                    status: 'success',
                    data: update
                });
            } catch(error) {
                console.log(error);
                res.status(400).json({
                    status: 'error',
                    message: error
                });
            }
    }
    else{
        res.status(400).json({
            message:'access denied',
        });
    }
    
};

exports.deleteUser=async (req, res, next) =>
{
    if(await cerbos.isAllowed(req.user,{resource:"user"},"update")) {
        try {
            const client=await db.connect();
            await client.query(`delete from "User" where "userName" = $1`, [req.params.slug]);

            res.status(200).json({
                status: 'success',
            });
        } catch(error) {
            console.log(error);
            res.status(400).json({
                status: 'error',
                message: error
            });
        }
    }
    else{
        res.status(400).json({
            message:'access denied',
        });
    }
};