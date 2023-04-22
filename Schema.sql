CREATE TYPE usertype AS ENUM ('admin', 'moderator', 'standard');
CREATE TYPE stats AS ENUM ('draft', 'pending_verification', 'on_verification', 'published', 'pushback', 'rejected', 'deleted');
CREATE TYPE visibilitySet AS ENUM ('not_applicable', 'public', 'private');
CREATE TYPE logstats AS ENUM ('draft', 'pending_verification', 'on_verification', 'published', 'pushback', 'rejected', 'delete', 'control');
CREATE TYPE userstate AS ENUM ('active', 'inactive', 'deleted');

CREATE TABLE "User" (
    "userName" VARCHAR(50) NOT NULL PRIMARY KEY,
    "profilePic" BYTEA,
    "firstName" VARCHAR(50) NOT NULL,
    "lastName" VARCHAR(50) NOT NULL,
    "emailAddress" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "userType" usertype NOT NULL,
    "userCreatedDate" TIMESTAMPTZ NOT NULL,
    "lastLogin" TIMESTAMPTZ NOT NULL,
    "userState" userstate NOT NULL
);


CREATE TABLE "TopCategory" (
    "categoryName" VARCHAR(50) NOT NULL PRIMARY KEY,
    "initializedBy" VARCHAR(50) NOT NULL,
    "dateCreated" TIMESTAMPTZ NOT NULL,
    CONSTRAINT fk_TopCategory_User
        FOREIGN KEY ("initializedBy")
            REFERENCES "User"("userName")
);


CREATE TABLE "CategorySet" (
    "catName" VARCHAR(50) NOT NULL PRIMARY KEY,
    "categorizedUnder" VARCHAR(50) NOT NULL,
    "initializedBy" VARCHAR(50) NOT NULL,
    "dateCreated" TIMESTAMPTZ NOT NULL,
    CONSTRAINT fk_CategorySet_User
        FOREIGN KEY ("initializedBy")
            REFERENCES "User"("userName"),
    CONSTRAINT fk_CategorySet_TopCataegory
        FOREIGN KEY ("categorizedUnder")
            REFERENCES "TopCategory"("categoryName")
);

CREATE TABLE "Article" (
    "slug" VARCHAR(500) NOT NULL PRIMARY KEY,
    "author" VARCHAR(50) NOT NULL,
    "title" VARCHAR(500) NOT NULL,
    "content" TEXT NOT NULL,
    "status" stats NOT NULL,
    "pushbackNotes" TEXT DEFAULT NULL,
    "visibility" visibilitySet NOT NULL,
    "viewCount" NUMERIC NOT NULL DEFAULT 0,
    "CoverImage" BYTEA,
    "Description" TEXT,
    CONSTRAINT fk_Article_User
        FOREIGN KEY ("author")
            REFERENCES "User"("userName")
);


CREATE TABLE "CategoryMap" (
    "article" VARCHAR(500) NOT NULL,
    "category" VARCHAR(50) NOT NULL,
    CONSTRAINT fk_CategoryMap_Article
        FOREIGN KEY ("article")
            REFERENCES "Article"("slug"),
    CONSTRAINT fk_CategoryMap_Category
        FOREIGN KEY ("category")
            REFERENCES "CategorySet"("catName")
);


CREATE TABLE "Supports" (
    "article" VARCHAR(500) NOT NULL,
    "user" VARCHAR(50) NOT NULL,
    "supportTime" TIMESTAMPTZ NOT NULL,
    CONSTRAINT fk_Supports_Article
        FOREIGN KEY ("article")
            REFERENCES "Article"("slug"),
    CONSTRAINT fk_Supports_User
        FOREIGN KEY ("user")
            REFERENCES "User"("userName")
);


CREATE TABLE "ArticleLogs" (
    "article" VARCHAR(500) NOT NULL,
    "status" logstats NOT NULL,
    "updateTime" TIMESTAMPTZ NOT NULL,
    "actionReason" TEXT DEFAULT NULL,
    "controlFrom" VARCHAR(50) NOT NULL,
    "controlTo" VARCHAR(50) NOT NULL,
    CONSTRAINT fk_ArticleLogs_Article
        FOREIGN KEY ("article")
            REFERENCES "Article"("slug"),   
    CONSTRAINT fk_ArticleLogs_User
        FOREIGN KEY ("controlFrom")
            REFERENCES "User"("userName"),
        FOREIGN KEY ("controlTo")
            REFERENCES "User"("userName")
);