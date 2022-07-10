const { response } = require('express');
const { Thought } = require('../models');

const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find({})
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

    createThought({ body }, res) {
        Thought.create(body)
            .then(response => res.json(response))
            .catch(err => res.status(400).json(err));
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
