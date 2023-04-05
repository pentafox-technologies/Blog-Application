const db=require('../db');
const cerbos=require("./../middleware/cerbos");

exports.getAllCategory=async (req, res, next) =>
{
    try {
        const client=db.connect();

        var TopCategory=await (await client).query(`SELECT * FROM "TopCategory"`);

        // TopCategory=TopCategory.rows.sort(function(a, b)
        // {
        //     var x=a.categoryName<b.categoryName? -1:1;
        //     return x;
        // });

        res.status(200).json({
            status: 'success',
            data: TopCategory,
        });

    } catch(error) {
        console.log(error);
        res.status(400).json({
            status: 'failed',
            Error: error
        });

    }
};

exports.createCategory=async (req, res, next) =>
{
    const client=await db.connect();
    if(true) {
        const newcategory=await client.query(`INSERT INTO "Category" ()`)
    }
    else {
        res.send("cannot access");
    }
};

exports.createTopCategory=async (req, res, next) =>
{
    const client=await db.connect();
    if(await cerbos.isAllowed(req.user, {resource: "category"}, "create")) {
        try {
            // console.log(req.user);
            const newTopCategory=await client.query(`INSERT INTO "TopCategory" ("categoryName", "initializedBy", "dateCreated") VALUES (${req.body.categoryName}, ${req.user}), ${Date.now()}`)
            console.log(newTopCategory);
            res.status(201).json({
                status: 'success',
                data: newTopCategory.rows,
            });
        } catch(err) {
            res.status(400).json({
                status: 'error',
                message: err
            });
        }
    }
    else {
        res.send("cannot access");
    }
};

exports.deleteTopCategory=async (req, res) =>
{
    try {
        if(req.params.slug!=="Other") {
            const client=await db.connect();
            await client.query(`update "CategorySet" set "categorizedUnder"=$1 where "categorizedUnder"=$2`, ["Other", req.params.slug]);
            await client.query(`delete from "TopCategory" where "categoryName" = $1`, [req.params.slug]);

            res.status(200).json({
                status: 'success',
            });
        } else {
            res.status(400).json({
                status: 'failed',
                message: 'Cannot delete this top category'
            });
        }
    } catch(error) {
        console.log(error);
        res.status(400).json({
            status: "Failed to delete",
            Error: {error}
        })
    }
}

// exports.createTopCategory = async (req, res, next) => {
//     const client = await db.connect();
//     const created =new Date();
//     try {
//         const newCategory = await client.query(`insert into "TopCategory" ("categoryName", "initializedBy","dateCreated") values($1,$2,$3) RETURNING *`, [req.body.categoryName,req.user.userName, created]);
//         res.status(201).json({
//             status: 'success',
//             data: newCategory
//         });
//     } catch(err){
//         console.log(err);
//         res.status(400).json({
//             status:'error',
//             message: err
//         });
//     }
//     res.status(201).json({
//         status: 'success'
//     });
// };

exports.getCategory=async (req, res, next) =>
{
    try {
        const client=await db.connect();
        var subCat=await client.query(`select * from "CategorySet" where "categorizedUnder" = $1`, [req.params.slug]);

        var articles=new Array();

        for(var i=0;i<subCat.rows.length;i++) {
            var cat=await client.query(`select * from "CategoryMap" where "category" = $1`, [subCat.rows[i].catName]);

            for(var j=0;j<cat.rows.length;j++) {
                const article=await client.query(`select * from "Article" where "slug" = $1`, [cat.rows[j].article]);
                console.log(!articles.includes(article.rows[0]))
                if(!articles.includes(article.rows[0])) {
                    articles.push(article.rows[0]);
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
        console.log(error)
        res.status(400).json({
            status: 'failed',
            Error: {error}
        });

    }
};

exports.updateCategory=(req, res, next) =>
{
    res.status(200).json({
        status: 'success'
    });
};

exports.deleteCategory=(req, res, next) =>
{
    res.status(204).json({
        status: 'success'
    });
};