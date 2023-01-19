exports.getAllSupport = (req, res, next) => {
    console.log("Support");
    res.status(200).json({
        status: 'success'
    });
};

exports.createSupport = (req, res, next) => {
    res.status(201).json({
        status: 'success'
    });
};

exports.getSupport = (req, res, next) => {
    res.status(200).json({
        status: 'success',
        data: {
            data: req.params.slug
        }
    });
};

exports.updateSupport = (req, res, next) => {
    res.status(200).json({
        status: 'success'
    });
};

exports.deleteSupport = (req, res, next) => {
    res.status(204).json({
        status: 'success'
    });
};