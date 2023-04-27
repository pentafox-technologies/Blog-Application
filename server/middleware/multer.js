const multer = require("multer");

const storage = multer.diskStorage({
    destination(req, file, cb) {
        const url = `./public/assets/articleCoverImages`;
        cb(null, url);
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