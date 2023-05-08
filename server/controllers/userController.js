const db=require('../db');
const bcrypt=require("bcryptjs");
const cerbos=require("./../middleware/cerbos");

exports.getAllUser=async (req, res, next) =>
{
    const client=await db;
    if(await cerbos.isAllowed(req.user,{resource:"user"},"getAll")) {
            try {
            
            const users=await client.query(`SELECT * FROM "User"`);
            res.status(200).json({
                status: 'success',
                data: users.rows,
            });
        } catch(err) {
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
        const client=await db;
        const user=await client.query(`select * from "User" where "userName" = $1 and "userState" != $2`, [name,"deleted"])

        if(user.rows.length==0) {
            return res.status(404).json({
                status: 'error',
                message: "No user found with this name"
            })
        }
        // if(user.userState==="deleted") {
        //     res.status(200).json({
        //         status: 'error',
        //         data: {
        //             user: user.rows
        //         },
        //     });
        // }
        else{
            res.status(200).json({
                status: 'success',
                data: user.rows[0]
            });
        }
        
    } catch(error) {
        res.status(400).json({
            status: "error",
            message: error
        })
    }

};

exports.getMe=async (req, res) =>
{
    console.log(req.user);
    if(await cerbos.isAllowed(req.user,{resource:"user"},"getByUserName")) {
            try {
            const client=await db;
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
                const client=await db;
                const update=await client.query(`update "User" set "firstName"=$1 where "userName" = $2`, [user.firstName, req.params.slug]);

                res.status(200).json({
                    status: 'success',
                    data: update
                });
            } catch(error) {
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
                const user = await client.query(`select * from "User" where "userName" = $1`, [req.params.slug]);
        // user = user.rows;
                if(user.rows.length == 0){
                    return res.status(400).json({
                        status:'error',
                        message: 'Incorrect username'
                    });
                }


                if( !await bcrypt.compare(req.body.oldPassword,user.rows[0].password)) {
                    return res.status(400).json({
                        status:'error',
                        message: 'Incorrect password'
                    });
                }

                const password=await bcrypt.hash(req.body.newPassword, 12);
                const update=await client.query(`update "User" set "password"=$1 where "userName" = $2`, [password, req.params.slug]);

                res.status(200).json({
                    status: 'success',
                    message: 'updated successfully'
                });
            } catch(error) {
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
                const client=await db;
                const update=await client.query(`update "User" set "profilePic"=$1 where "userName" = $2`, [req.body.profilePic, req.params.slug]);

                res.status(200).json({
                    status: 'success',
                    data: update
                });
            } catch(error) {
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
                const client=await db;
                const update=await client.query(`update "User" set "emailAddress"=$1 where "userName" = $2`, [req.body.emailAddress, req.params.slug]);

                res.status(200).json({
                    status: 'success',
                    data: update
                });
            } catch(error) {
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
    // if(await cerbos.isAllowed(req.user,{resource:"user"},"delete")) {
        try {
            const client=await db;
            
            await client.query(`update "User" set "userState"=$1 where "userName" = $2`, ["deleted", req.params.slug]);

            res.status(200).json({
                status: 'success',
                message: 'user deleted successfully'
            });
        } catch(error) {
            console.log(err);
            res.status(400).json({
                status: 'error',
                message: error
            });
        }
    // }
    // else{
    //     res.status(400).json({
    //         message:'access denied',
    //     });
    // }
};

exports.promoteUser=async (req, res, next) =>
{
    if(await cerbos.isAllowed(req.user, {resource: "user"}, "promoteUser")) {
        try {
            const client=await db;
            const id=req.params.slug;

            const user=await client.query(`update "User" set "userType"=$2 where "userName" = $1`, [id, req.body.role])

            res.status(200).json({
                status: 'Request success',
                message: user
            });

        } catch(error) {
            res.status(400).json({
                status: 'Request failed',
                message: error
            });
        }
    }
    else{
        res.status(400).json({
            message:'access denied',
        });
    }
}