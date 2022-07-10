const { response } = require('express');
const { Thought, User } = require('../models');

const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find({})
            .populate({
                path: "reactions",
                select: "-__v",
            })
            .select("-__v")
            .sort({ _id: -1 })
            .then((response) => res.json(response))
            .catch((err) => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    getSingleThought({ params }, res) {
        Thought.findOne({ _id: params.id })
            .populate({
                path: "reactions",
                select: "-__v",
            })
            .select("-__v")
            .sort({ _id: -1 })
            .then((response) => {
                if (!response) {
                    res.status(404).json({ message: "No thought found for this id"});
                    return;
                }
                res.json(response);
            })
            .catch((err) => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    createThought({ body }, res) {
        Thought.create(body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: _id } },
                    { new: true }
                );
            })
            .then((response) => {
                if (!response) {
                    res.status(404).json({
                        message: "No thought found with this id!",
                    });
                    return;
                }
                res.json(response);
            })
            .catch((err) => res.json(err));
    },


    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(response => res.json(response))
            .catch(err => res.json(err));
    },

    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .select('-__v')
            .then(response => {
                if (!response) {
                    res.status(404).json({ message: 'Thought not found' });
                    return;
                }
                res.json(response);
            })
            .catch(err => res.status(400).json(err));
    }

}

module.exports = thoughtController;
