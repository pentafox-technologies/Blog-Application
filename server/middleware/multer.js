const multer = require("multer");
const fs = require('fs');

exports.upload = (path) => {
    console.log("hiiii");
    const storage = multer.diskStorage({
        destination(req, file, cb) {
            try {
                let folderName = `./public`;
                if (!fs.existsSync(folderName)) fs.mkdirSync(folderName);
                folderName = `./public/assets`;
                if (!fs.existsSync(folderName)) fs.mkdirSync(folderName);
                folderName = `./public/assets/${path}`;
                if (!fs.existsSync(folderName)) fs.mkdirSync(folderName);
              } catch (err) {
                console.error(err);
              }
              const folderName = `./public/assets/${path}`;
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
    return uploadImg;
}

