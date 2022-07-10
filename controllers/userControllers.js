const { response } = require('express');
const { User } = require('../models');

const userController = {
    getAllUsers(req, res) {
        User.find({})
            .select("-__v")
            .sort({ _id: -1 })
            .then((response) => res.json(response))
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
            .then((response) => res.json(response))
            .catch((err) => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    createUser({ body }, res) {
        User.create(body)
            .then(response => res.json(response))
            .catch(err => res.status(400).json(err));
    },

    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(response => res.json(response))
            .catch(err => res.json(err));
    },

    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id}, body, { new: true, runValidators: true })
            .select('-__v')
            .then(response  => {
                if (!response) {
                    res.status(404).json({ message: 'User not found' });
                    return;
                }
                res.json(response);
            })
            .catch(err => res.status(400).json(err));
    }

}

module.exports = userController;
