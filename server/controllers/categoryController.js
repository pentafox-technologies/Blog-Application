exports.getAllCategory = (req, res, next) => {
    console.log("category");
    res.status(200).json({
        status: 'success'
    });
};

exports.createCategory = (req, res, next) => {
    res.status(201).json({
        status: 'success'
    });
};

exports.getCategory = (req, res, next) => {
    res.status(200).json({
        status: 'success',
        data: {
            data: req.params.slug
        }
    });
};

exports.updateCategory = (req, res, next) => {
    res.status(200).json({
        status: 'success'
    });
};

exports.deleteCategory = (req, res, next) => {
    res.status(204).json({
        status: 'success'
    });
};