const multer = require("multer");
const fs = require('fs');

const storage = multer.diskStorage({
    destination(req, file, cb) {
        const folderName = `./public/assets/articleCoverImages`;
        try {
            if (!fs.existsSync(folderName)) {
                fs.mkdirSync(`./public`);
                fs.mkdirSync(`./public/assets`);
                fs.mkdirSync(`./public/assets/articleCoverImages`);
            }
          } catch (err) {
            console.error(err);
          }
        cb(null, folderName);
    },
    filename(req, file, cb) {
        file.originalname = "re_" + file.originalname;
        cb(null, Date.now()+`${file.originalname}`);
    }
});
const uploadImg = multer({
    storage: storage
});

exports.upload = uploadImg;