exports.getAllArticle = (req, res, next) => {
    res.status(200).json({
        status: 'success'
    });
};

exports.createArticle = (req, res, next) => {
    res.status(201).json({
        status: 'success'
    });
};

exports.getArticle = (req, res, next) => {
    res.status(200).json({
        status: 'success',
        data: {
            data: req.params.slug
        }
    });
};

exports.updateArticle = (req, res, next) => {
    res.status(200).json({
        status: 'success'
    });
};

exports.deleteArticle = (req, res, next) => {
    res.status(204).json({
        status: 'success'
    });
};