const { User } = require('../models');

const userController = {
    getAllUsers(req, res) {
        User.find({})
            .select("-__v")
            .sort({ _id: -1 })
            .then((userDbData) => res.json(userDbData))
            .catch((err) => {
                console.log(err);
                res.sendStatus(400);
            });
    },
}

module.exports = userController;
