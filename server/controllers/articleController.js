const db=require('../db');
const slugify=require('slugify');
const cerbos=require("./../middleware/cerbos");

exports.createArticle=async (req, res) =>
{
    if(await cerbos.isAllowed(req.user, {resource: "article"}, "create")) {
        const client=await db.connect();
        try {
            // splitting categories to array
            const categories=req.body.category.split(" ");

            // here we are inserting into categorySet Table
            // And we will check whether that category does not exist, if true we will insert it by categorized under = "Other"
            for(let i=0;i<categories.length;i++) {
                const created=new Date();
                let checkcategory=await client.query(`select * from "CategorySet" where "catName" like '${categories[i]}'`);
                if(checkcategory.rows.length==0) {
                    let categorizedUnder="Other"
                    let newCategory=await client.query(`insert into "CategorySet" ("catName", "categorizedUnder", "initializedBy", "dateCreated") values($1,$2,$3,$4) RETURNING *`, [categories[i], categorizedUnder, req.user.userName, created]);
                }
            }

            // Initially we are creating slug based on title
            let slug=slugify(req.body.title, {lower: true})+Math.random().toString(36).slice(2);

            // Checking whether sulg already exists
            // running this loop until we get unique slug
            while(true) {
                temp=await client.query(`select * from "Article" where slug like '${slug}'`);
                if(temp.rows.length>0) {
                    slug=slugify(req.body.title, {lower: true})+Math.random().toString(36).slice(2);
                }
                if(temp.rows==0) {
                    break;
                }
            }

            // Initially when creating status will always be draft
            const status="draft";

            // Visibilty will be initially private
            const visibilty="private";

            //  Query for creating article
            const newArticle=await client.query(`insert into "Article" ("slug", "author","title","content","status","visibility") values($1,$2,$3,$4,$5,$6) RETURNING *`, [slug, req.user.userName, req.body.title, req.body.content, status, visibilty]);

            // we have to insert the category and article into categoryMap.
            for(let i=0;i<categories.length;i++) {
                const categoryMap=await client.query(`insert into "CategoryMap" ("article", "category") values($1,$2) RETURNING *`, [newArticle.rows[0].slug, categories[i]]);
            }

            // sending response finally ☺️
            res.status(201).json({
                status: 'success',
                data: newArticle
            });

        } catch(err) {
            console.log(err);
            res.status(400).json({
                status: 'error',
                message: err
            });
        }
    }
    else {
        res.status(400).json({
            status: 'access denied',
            message: err
        });
    }
};

exports.getAllArticle=async (req, res, next) =>
{
    const client=await db.connect();
    try {
        const Articles=await client.query(`select * from "Article";`);
        res.status(201).json({
            status: 'success',
            data: Articles.rows,
        });

    } catch(error) {
        console.log(error);
        res.status(400).json({
            status: 'error',
            message: error
        });
    }
};

exports.getArticle=async (req, res, next) =>
{
    const slug=req.params.slug;

    const client=await db.connect();
    try {
        const Article=await client.query(`SELECT * FROM "Article" where slug like $1;`, [slug]);
        res.status(201).json({
            status: 'success',
            data: Article.rows,
        });
    } catch(error) {
        console.log(error);
        res.status(400).json({
            status: 'error',
            message: error
        });
    }
};

exports.updateArticle=async (req, res) =>
{

    const client=await db.connect();
    const Article=await client.query(`SELECT * FROM "Article" where slug like $1;`, [req.params.slug]);
    Article.resource="article";
    if(await cerbos.isAllowed(req.user, Article, "update")) {
        try {

            // splitting categories to array
            let categories=[];
            if(req.body.category) {
                categories=req.body.category.split(" ");
            }
            console.log(categories);
            // here we are inserting into categorySet Table
            // And we will check whether that category does not exist, if true we will insert it by categorized under = "Other"
            if(categories.length>0) {
                for(let i=0;i<categories.length;i++) {
                    const created=new Date();
                    let checkcategory=await client.query(`select * from "CategorySet" where "catName" like '${categories[i]}'`);
                    if(checkcategory.rows.length==0) {
                        let categorizedUnder="Other"
                        let newCategory=await client.query(`insert into "CategorySet" ("catName", "categorizedUnder", "initializedBy", "dateCreated") values($1,$2,$3,$4) RETURNING *`, [categories[i], categorizedUnder, req.user.userName, created]);
                    }
                }
            }

            var query=['UPDATE "Article"'];
            query.push('SET');

            // Create another array storing each set command
            // and assigning a number value for parameterized query
            let set=[];
            console.log(req.body);
            let values=[];
            Object.keys(req.body).forEach(function(key, i)
            {
                if(key!='category') {
                    set.push(key+' = ($'+(i+1)+')');
                    values.push(req.body[key]);
                }
            });
            query.push(set.join(', '));


            // // Add the WHERE statement to look up by id
            query.push('WHERE "slug" = '+`'${req.params.slug}' RETURNING *`);

            // // Return a complete query string
            query=query.join(' ')
            console.log(query);


            //  Query for creating article
            const Article=await client.query(query, values);

            // // we have to insert the category and article into categoryMap.
            // select * from "CategorySet" where "catName" like '${categories[i]}'
            for(let i=0;i<categories.length;i++) {
                const iscategory=await client.query(`SELECT * FROM "CategoryMap" WHERE "category" = ($1) and "article"= ($2)`, [categories[i], req.params.slug]);
                if(iscategory.rows.length==0) {
                    const categoryMap=await client.query(`insert into "CategoryMap" ("article", "category") values($1,$2) RETURNING *`, [req.params.slug, categories[i]]);
                }
            }

            // sending response finally ☺️
            res.status(200).json({
                status: 'success',
                data: Article
            });

        } catch(err) {
            console.log(err);
            res.status(400).json({
                status: 'error',
                message: err
            });
        }
    }
    else {
        res.status(400).json({
            status: 'access denied',
            message: err
        });
    }


};

exports.deleteArticle=async (req, res, next) =>
{
    if(await cerbos.isAllowed(req.user, {resource: "article"}, "delete")) {
        const slug=req.params.slug;

        const client=await db.connect();

        try {
            const Articles=await client.query(`DELETE FROM "Article" WHERE slug like $1;`, [slug]);
            res.status(204).json({
                status: 'success',
                data: Articles,
            });

        } catch(error) {
            console.log(error);
            res.status(400).json({
                status: 'error',
                message: error
            });
        }
    }
    else {
        res.status(400).json({
            status: 'access denied',
            message: err
        });
    }
};

exports.searchArticle = async (req, res) => {
    try {
        const client = await db.connect();
        const query = req.params.query;
    } catch (err) {
        res.status(404).data({
            status:"error",
            data:{
                err: err.message
            }
        })
    }
}



// Validation Part 

exports.requestToValidate=async (req, res, next) =>
{
    const client=await db.connect();
    const article=await client.query(`SELECT * FROM "Article" where slug like $1;`, [req.params.slug]);

    try {

        // Check whether article exist or not
        if(article.rowCount<=0) {
            res.status(200).json({
                status: 'Request failed',
                message: 'Article not found',
            });
        }

        // to check the log status
        let articleStatus=await client.query(`SELECT * FROM "ArticleLogs" where article like $1`, [req.params.slug]);

        if(!articleStatus) {
            state='on_verification';
            reason='Request validation';

            let newLog=await client.query(`insert into "ArticleLogs" ("article", "status","updateTime","actionReason", "controlFrom","controlTo") values($1,$2,$3,$4,$5,$6) returning *`, [req.params.slug, state, new Date(), reason, article.rows[0].author, req.user.userName])

            res.status(200).json({
                status: 'Request approved',
                log: newLog.rows,
            });
        }
        else {
            res.status(400).json({
                status: 'Request failed',
                message: 'Already on validation'
            });
        }
    } catch(error) {
        console.log(error);
        res.status(400).json({
            status: 'Request Failed',
            message: error,
        });

    }
}

exports.requestForApproval = async (req, res) => {
    try {
        const client = await db.connect();
        
        const Article = await client.query('UPDATE "Article" SET status = ($1) WHERE "slug" = ($2)',['pending_verification',req.params.slug]);
        res.status(200).json({
            status: 'success',
            message: 'Sent For verification'
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            status:'error',
            message: err
        });
    }
    
}

exports.approveAndPublish = async (req, res) => {
    try {
        const client = await db.connect();
        const Article = await client.query('UPDATE "Article" SET status = ($1) WHERE "slug" = ($2)',['published',req.params.slug]);
        res.status(200).json({
            status: 'success',
            message: 'Approved And Published'
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            status:'error',
            message: err
        });
    }
}

exports.rejectPost = async (req, res) => {
    try {
        const client = await db.connect();
        const Article = await client.query('UPDATE "Article" SET status = ($1) WHERE "slug" = ($2)',['rejected',req.params.slug]);
        res.status(200).json({
            status: 'success',
            message: 'Rejected The Post'
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            status:'error',
            message: err
        });
    }
}

exports.getPendingVerication = async (req, res) => {
    try{
        const client = await db.connect();
        const articles = await client.query(`SELECT * FROM "Article" WHERE "status" = ($1)`, ['pending_verification']);
        res.status(200).json({
            status: 'success',
            data: articles.rows
        });

    } catch(err) {
        console.log(err);
        res.status(400).json({
            status:'error',
            message: err
        });
    }
}

