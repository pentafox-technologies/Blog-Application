exports.getAllUser = (req, res, next) => {
    console.log("user");
    res.status(200).json({
        status: 'success'
    });
};

exports.createUser = (req, res, next) => {
    res.status(201).json({
        status: 'success'
    });
};

exports.getUser = (req, res, next) => {
    res.status(200).json({
        status: 'success',
        data: {
            data: req.params.slug
        }
    });
};

exports.updateUser = (req, res, next) => {
    res.status(200).json({
        status: 'success'
    });
};

exports.deleteUser = (req, res, next) => {
    res.status(204).json({
        status: 'success'
    });
};