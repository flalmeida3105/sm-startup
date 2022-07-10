const { User } = require('../models');

const userController = {
    getAllUsers(req, res) {
        User.find({})
            .select("-__v")
            .sort({ _id: -1 })
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    getSingleUser({ params }, res) {
        User.findOne({ _id: params.id })
            // .populate({
            //     path: "thoughts",
            //     select: "-__v",
            // })
            .select("-__v")
            .then((dbUserData) => res.json(dbUserData))
            .catch((err) => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },

    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    },

}

module.exports = userController;
