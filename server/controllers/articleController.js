const db = require('../db');
const slugify = require('slugify');
const cerbos = require("./../middleware/cerbos");
const fs = require('fs');

exports.createArticle = async (req, res) => {
    if (await cerbos.isAllowed(req.user, { resource: "article" }, "create")) {
        const client = await db;
        try {

            req.body.category.map(async category => {
                const created = new Date();
                let checkcategory = await client.query(`select * from "CategorySet" where "catName" like '${category}'`);
                if (checkcategory.rows.length == 0) {
                    let categorizedUnder = req.body.topCategory;
                    let newCategory = await client.query(`insert into "CategorySet" ("catName", "categorizedUnder", "initializedBy", "dateCreated") values($1,$2,$3,$4) RETURNING *`, [category, categorizedUnder, req.user.userName, created]);
                }
            })

            // Initially we are creating slug based on title
            let slug = slugify(req.body.title, { lower: true }) + Math.random().toString(36).slice(2);

            // Checking whether sulg already exists
            // running this loop until we get unique slug
            while (true) {
                temp = await client.query(`select * from "Article" where slug like $1`, [slug]);
                if (temp.rows.length > 0) {
                    slug = slugify(req.body.title, { lower: true }) + Math.random().toString(36).slice(2);
                }
                if (temp.rows == 0) {
                    break;
                }
            }

            // Initially when creating status will always be draft
            const status = req.body.status;

            // Visibilty will be initially private
            const visibilty = "private";
            //  Query for creating article
            const newArticle = await client.query(`insert into "Article" ("slug", "author","title","content","status","visibility","coverImage","description","category") values($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`, [slug, req.user.userName, req.body.title, req.body.content, status, visibilty, req.file.filename, req.body.description, req.body.topCategory]);

            // we have to insert the category and article into categoryMap.
            req.body.category.map(async category => {
                await client.query(`insert into "CategoryMap" ("article", "category") values($1,$2) RETURNING *`, [newArticle.rows[0].slug, category]);
            })

            await client.query(`insert into "ArticleLogs" ("article", "status","updateTime","actionReason","controlFrom","controlTo") values($1,$2,$3,$4,$5,$6) RETURNING *`, [slug, status, new Date(), "created Article", req.user.userName, req.user.userName]);
            // sending response finally ☺️
            res.status(201).json({
                // "headers": { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                status: 'success',
                data: newArticle.rows
            });

        } catch (err) {
            res.status(400).json({
                status: 'error',
                message: err
            });
        }
    }
    else {
        res.status(400).json({
            message: 'access denied',
        });
    }
};

exports.getAllArticle = async (req, res, next) => {
    const client = await db;
    try {
        const Articles = await client.query(`select "slug","title","coverImage","description","category" from "Article" where "status"=$1 and "visibility"=$2;`, ["published", "public"]);
        result = [];
        for (var i = 0; i < Articles.rows.length; ++i) {
            let article = Articles.rows[i];
            let publishedDate = await client.query(`select "updateTime" from "ArticleLogs" where "article"=$1 and "actionReason"=$2 ORDER BY "updateTime" DESC LIMIT 1`, [article.slug, "Approved and Published"]);
            tem = { ...Articles.rows[i], publishedDate: publishedDate.rows[0].updateTime };
            result.push(tem);
        }
        res.status(201).json({
            status: 'success',
            data: result,
        });

    }
    catch (error) {
        res.status(400).json({
            status: 'error',
            message: error
        });
    }
};

exports.getArticle = async (req, res, next) => {
    const slug = req.params.slug;

    const client = await db;
    try {
        const Article=await client.query(`SELECT * FROM "Article" where slug = $1 and status=$2 and visibility=$3;`, [slug,"published","public"]);
        
        if(Article.rowCount==0){
            res.status(201).json({
                status: 'error',
                message: 'no article found',
            });
        }
        else {
            res.status(201).json({
                status: 'success',
                data: Article.rows[0],
            });
        }

    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error
        });
    }
};

exports.getUserArticle = async (req, res) => {

    if (await cerbos.isAllowed(req.user, { resource: "article" }, "getmy")) {
        try {
            const client = await db;
            const Article = await client.query(`SELECT * FROM "Article" where "author"=$1 and "status"=$2;`, [req.user.userName, "published"]);
            res.status(201).json({
                status: 'success',
                data: Article.rows,
            });
        }
        catch (err) {
            res.status(400).json({
                status: 'error',
                message: err,
            });
        }
    }
    else {
        res.status(400).json({
            message: 'access denied',
        });
    }
}

exports.getUserDraft = async (req, res) => {

    if (await cerbos.isAllowed(req.user, { resource: "article" }, "getmy")) {
        try {
            const client = await db;
            let Articles = await client.query(`SELECT "slug","title","content","category","coverImage","description" FROM "Article" where "author"=$1 and "status"=$2;`, [req.user.userName, "draft"]);
            let articles = [];
            for (let i = 0; i < Articles.rows.length; ++i) {
                let article = Articles.rows[i]
                let subCategory = await client.query(`SELECT "category" from "CategoryMap" where "article"=$1`, [article.slug])
                let subCategories = subCategory.rows.map(category => { return category.category })
                articles.push({ ...article, subCategory: subCategories })
            }
            res.status(201).json({
                status: 'success',
                data: articles,
            });
        }
        catch (err) {
            res.status(400).json({
                status: 'error',
                message: err,
            });
        }
    }
    else {
        res.status(400).json({
            message: 'access denied',
        });
    }
}

exports.updateArticle = async (req, res) => {
    try {
        const client = await db;
        let Article = await client.query(`SELECT * FROM "Article" where slug = $1 and status!=$2;`, [req.params.slug, "deleted"]);
        Article = Article.rows[0];
        Article.resource = "article";

        if (await cerbos.isAllowed(req.user, Article, "update")) {

            let oldCategory = await client.query(`SELECT * FROM "CategoryMap" where "article"=$1`, [req.params.slug])

            oldCategory.rows.map(async (cat) => {
                if (!req.body.category.includes(cat.category)) {
                    await client.query(`Delete FROM "CategoryMap" where "article"=$1 and "category"=$2`, [req.params.slug, cat.category]);
                }
            })

            req.body.category.map(async (cat) => {
                let tem = await client.query(`SELECT * FROM "CategoryMap" where "article"=$1 and "category"=$2`, [req.params.slug, cat]);
                if (tem.rows.length == 0) {
                    let tem1 = await client.query(`SELECT * FROM "CategorySet" where "catName"=$1`, [cat]);
                    if (tem1.rows.length == 0) {
                        await client.query(`insert into "CategorySet" ("catName", "categorizedUnder","initializedBy","dateCreated") values($1,$2,$3,$4) RETURNING *`, [cat, req.body.topCategory, req.user.userName, new Date()])
                    }
                    await client.query(`insert into "CategoryMap" ("article", "category") values($1,$2) RETURNING *`, [req.params.slug, cat])
                }
            })

            if (Article.coverImage != req.body.coverImage) {
                await fs.unlinkSync(`public/assets/articleCoverImages/` + Article.coverImage);
                await client.query(`UPDATE "Article" set "title"=$1, "content"=$2, "description"=$3, "coverImage"=$4, "category"=$5, "status"=$6 where "slug"=$7`, [req.body.title, req.body.content, req.body.description, req.file.filename, req.body.topCategory, req.body.status, Article.slug]);
            }
            else await client.query(`UPDATE "Article" set "title"=$1, "content"=$2, "description"=$3, "category"=$4, "status"=$5 where "slug"=$6`, [req.body.title, req.body.content, req.body.description, req.body.topCategory, req.body.status, Article.slug]);

            res.status(200).json({
                status: 'success',
                data: "Article upadted successfully"
            });
        }
        else {
            res.status(400).json({
                message: 'access denied',
            });
        }
    }
    catch (err) {
        res.status(400).json({
            status: 'error',
            message: err
        });
    }
};

exports.deleteArticle = async (req, res, next) => {
    try {
        const slug = req.params.slug;
        const client = await db;
        let Article = await client.query(`SELECT * FROM "Article" where "slug" = $1 and "status"!=$2;`, [slug, "deleted"]);
        Article = Article.rows[0];
        Article.resource = "article";
        if (await cerbos.isAllowed(req.user, Article, "delete")) {
            await client.query(`Delete FROM "ArticleLogs" where "article"=$1;`, [slug]);
            await client.query(`Delete FROM "Supports" where "article"=$1;`, [slug]);
            await client.query(`Delete FROM "CategoryMap" where "article"=$1;`, [slug]);
            await client.query(`Delete FROM "Article" where "slug"=$1;`, [slug]);
            fs.unlinkSync(`./public/assets/articleCoverImages/${Article.coverImage}`);

            res.status(200).json({
                status: 'success',
                message: "article deleted successfully",
            });
        }
        else {
            res.status(400).json({
                message: 'access denied',
            });
        }
    } catch (error) {
        res.status(401).json({
            status: 'error',
            message: "Article not found"
        });
    }
};

exports.searchArticle = async (req, res) => {
    try {
        const query = req.params.query + "%";
        const client = await db;
        const result = await client.query(`SELECT * FROM "Article" where slug like $1 and status=$2;`, [query, "published"]);
        res.status(200).json({
            status: 'success',
            data: {
                data: result.rows
            }
        });

    } catch (err) {
        res.status(404).json({
            status: "error",
            data: {
                err: err.message
            }
        })
    }
}

exports.sendForApproval = async (req, res) => {

    const client = await db;
    let Article1 = await client.query(`SELECT * FROM "Article" where slug like $1 and status!=$2;`, [req.params.slug, 'deleted']);
    Article1 = Article1.rows[0];
    Article1.resource = "article";

    if (await cerbos.isAllowed(req.user, Article1, "requestForApproval")) {
        try {

            const Article = await client.query('UPDATE "Article" SET status = ($1) WHERE "slug" = ($2)', ['pending_verification', req.params.slug]);
            await client.query(`insert into "ArticleLogs" ("article", "status","updateTime","actionReason","controlFrom","controlTo") values($1,$2,$3,$4,$5,$6) RETURNING *`, [Article1.slug, Article1.status, new Date(), "Send for Approval", req.user.userName, req.user.userName]);

            res.status(200).json({
                status: 'success',
                message: 'Sent For verification'
            });
        } catch (err) {
            res.status(400).json({
                status: 'error',
                message: err
            });
        }
    }
    else {
        res.status(400).json({
            message: 'access denied',
        });
    }
}

exports.approveAndPublish = async (req, res) => {
    if (await cerbos.isAllowed(req.user, { resource: "article" }, "approve and publish")) {
        try {
            const client = await db;
            await client.query('UPDATE "Article" SET status = $1, visibility = $2 WHERE "slug" = $3', ['published', 'public', req.params.slug]);
            let Article = await client.query(`SELECT * FROM "Article" where slug like $1 and status!=$2;`, [req.params.slug, 'deleted']);
            await client.query(`insert into "ArticleLogs" ("article", "status","updateTime","actionReason","controlFrom","controlTo") values($1,$2,$3,$4,$5,$6) RETURNING *`, [Article.rows[0].slug, Article.rows[0].status, new Date(), "Approved and Published", req.user.userName, Article.rows[0].author]);

            res.status(200).json({
                status: 'success',
                message: 'Approved And Published'
            });
        } catch (err) {
            res.status(400).json({
                status: 'error',
                message: err
            });
        }
    }
    else {
        res.status(400).json({
            message: 'access denied',
        });
    }
}

exports.rejectPost = async (req, res) => {
    if (await cerbos.isAllowed(req.user, { resource: "article" }, "reject")) {
        try {
            const client = await db;
            await client.query('UPDATE "Article" SET status = ($1) WHERE "slug" = ($2)', ['rejected', req.params.slug]);
            let Article = await client.query(`SELECT * FROM "Article" where slug like $1 and status!=$2;`, [req.params.slug, 'deleted']);
            await client.query(`insert into "ArticleLogs" ("article", "status","updateTime","actionReason","controlFrom","controlTo") values($1,$2,$3,$4,$5,$6) RETURNING *`, [Article.rows[0].slug, Article.rows[0].status, new Date(), "Rejected", req.user.userName, Article.rows[0].author]);
            res.status(200).json({
                status: 'success',
                message: 'Rejected The Post'
            });
        } catch (err) {
            res.status(400).json({
                status: 'error',
                message: err
            });
        }
    }
    else {
        res.status(400).json({
            message: 'access denied',
        });
    }

}

exports.getPendingVerication = async (req, res) => {
    if (await cerbos.isAllowed(req.user, { resource: "article" }, "getPendingVerication")) {
        try {
            const client = await db;
            const articles = await client.query(`SELECT "slug","title","author","coverImage","category" FROM "Article" WHERE "status" = ($1) and author!=$2`, ['pending_verification',req.user.userName]);
            res.status(200).json({
                status: 'success',
                data: articles.rows
            });

        } catch (err) {
            res.status(400).json({
                status: 'error',
                message: err
            });
        }
    }
    else {
        res.status(400).json({
            message: 'access denied',
        });
    }

}

exports.selectToValidate = async (req, res, next) => {
    if (await cerbos.isAllowed(req.user, { resource: "article" }, "validate")) {
        try {
            const client = await db;
            const article = await client.query(`SELECT * FROM "Article" where slug = $1;`, [req.params.slug]);

            // Check whether article exist or not
            if (article.rowCount <= 0) {
                res.status(200).json({
                    status: 'Request failed',
                    message: 'Article not found',
                });
            }

            state = 'on_verification';
            reason = 'Request validation';

            let newLog = await client.query(`insert into "ArticleLogs" ("article", "status","updateTime","actionReason", "controlFrom","controlTo") values($1,$2,$3,$4,$5,$6) returning *`, [req.params.slug, state, new Date(), reason, article.rows[0].author, req.user.userName])
            let articleStatus = await client.query(`update "Article" set "status"=$1 where "slug" = $2`, [state, req.params.slug])

            res.status(200).json({
                status: 'Select for validation approved',
                log: newLog.rows,
            });
        }
        catch (error) {
            res.status(400).json({
                status: 'Request Failed',
                message: error,
            });
        }
    }
    else {
        res.status(400).json({
            message: 'access denied',
        });
    }
}

exports.pushbackArticle = async (req, res) => {
    if (await cerbos.isAllowed(req.user, { resource: "article" }, "pushback")) {
        try {
            const client = await db;

            const article = await client.query(`SELECT * FROM "Article" where slug like $1;`, [req.params.slug]);
            // Check whether article exist or not
            if (article.rowCount <= 0) {
                res.status(200).json({
                    status: 'Request failed',
                    message: 'Article not found',
                });
            }
            await client.query('UPDATE "Article" SET "pushbackNotes" = ($1), status = ($2) WHERE "slug" = ($3)', [req.body.pushbackNotes, 'pushback', req.params.slug]);
            let Article = await client.query(`SELECT * FROM "Article" where slug like $1 and status!=$2;`, [req.params.slug, 'deleted']);
            await client.query(`insert into "ArticleLogs" ("article", "status","updateTime","actionReason","controlFrom","controlTo") values($1,$2,$3,$4,$5,$6) RETURNING *`, [Article.rows[0].slug, Article.rows[0].status, new Date(), "Pushback", req.user.userName, Article.rows[0].author]);

            res.status(200).json({
                status: 'success',
                message: 'PushBack with notes'
            });
        } catch (err) {
            res.status(400).json({
                status: 'error',
                message: err
            });
        }
    }
    else {
        res.status(400).json({
            message: 'access denied',
        });
    }
}



exports.getPendingArticles = async (req, res) => {
    if (await cerbos.isAllowed(req.user, { resource: "article" }, "getmy")) {
        try {
        const client = await db;
        const PENDING_VERIFICATION = "pending_verification"
        const articles = await client.query(`SELECT "slug","title","coverImage","category" FROM "Article" WHERE "author"=($3) AND "status" = ($1) OR "status" = ($2)`, [PENDING_VERIFICATION, 'on_verification',String(req.user.userName)]);
        res.status(200).json({
            status: 'Success', 
            articles: articles.rows
        });
        } catch (err) {
        res.status(400).json({
            status:'error',
            message: err
        });
        }
    }
    else {
        res.status(400).json({
            message: 'access denied',
        });
    }
}


exports.getRejectedArticles = async (req, res) => {
    if (await cerbos.isAllowed(req.user, { resource: "article" }, "getmy")) {
        try {
        const client = await db;
        const REJECTED = "rejected"
        const articles = await client.query(`SELECT "slug","title","coverImage","category" FROM "Article" WHERE "status" = ($1) AND "author"=($2)`, [REJECTED, String(req.user.userName)]);
        res.status(200).json({
            status: 'Success',
            articles: articles.rows
        });
        } catch (err) {
        res.status(400).json({
            status:'error',
            message: err
        });
        }
    }
    else {
        res.status(400).json({
            message: 'access denied',
        });
    }
}

exports.getBack = async(req,res) => {
    if (await cerbos.isAllowed(req.user, { resource: "article" }, "getmy")) {
        try {
        const client = await db;
        await client.query(`UPDATE "Article" set "status"=$1 where "slug"=$2`, ["draft",req.params.slug]);
        res.status(200).json({
            
            status: 'success',
            message: 'Article rollBacked to Draft'
        });
        } catch (err) {
        res.status(400).json({
            status:'error',
            message: err
        });
        }
    }
    else {
        res.status(400).json({
            message: 'access denied',
        });
    }
}


exports.getPushbackArticles = async (req, res) => {
    if (await cerbos.isAllowed(req.user, { resource: "article" }, "getmy")) {
        try {
        const client = await db;
        const articles = await client.query(`SELECT "slug","title","coverImage","category","pushbackNotes" FROM "Article" WHERE "status" = ($1) AND "author"=($2)`, ["pushback", String(req.user.userName)]);
        res.status(200).json({
            status: 'Success',
            articles: articles.rows
        });
        } catch (err) {
        res.status(400).json({
            status:'error',
            message: err
        });
        }
    }
    else {
        res.status(400).json({
            message: 'access denied',
        });
    }
}