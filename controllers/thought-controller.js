// ? Thought Controller
const { Thought } = require("../models");

const thoughtController = {
  // Get all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .populate({ path: "reactions", select: "-__v" })
      .select("-__v")
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  // Get a single thought by id
  getThoughtById(req, res) {
    Thought.findOne({ _id: req.params.id })
      .populate({ path: "reactions", select: "-__v" })
      .select("-__v")
      .then((thought) => {
        if (!thought) {
          return res
            .status(404)
            .json({ message: "No thought found with this id!" });
        }
        res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },

  // Create a new thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) => {
        if (!user) {
          return res
            .status(404)
            .json({ message: "No user found with this id!" });
        }
        res.json(thought);
      })
      .catch((err) => res.status(400).json(err));
  },

  // Update a thought by id
  updateThought(req, res) {
    Thought.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    })
      .then((thought) => {
        if (!thought) {
          return res
            .status(404)
            .json({ message: "No thought found with this id!" });
        }
        res.json(thought);
      })
      .catch((err) => res.status(400).json(err));
  },

  // Delete a thought by id
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.id })
      .then((thought) => {
        if (!thought) {
          return res
            .status(404)
            .json({ message: "No thought found with this id!" });
        }
        return User.findOneAndUpdate(
          { thoughts: req.params.id },
          { $pull: { thoughts: req.params.id } },
          { new: true }
        );
      })
      .then(() => {
        res.json({ message: "Thought deleted!" });
      })
      .catch((err) => res.status(500).json(err));
  },

  // Create a reaction
  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { new: true, runValidators: true }
    )
      .then((thought) => {
        if (!thought) {
          return res
            .status(404)
            .json({ message: "No thought found with this id!" });
        }
        res.json(thought);
      })
      .catch((err) => res.status(400).json(err));
  },

  // Delete a reaction
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    )
      .then((thought) => {
        if (!thought) {
          return res
            .status(404)
            .json({ message: "No thought found with this id!" });
        }
        res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = thoughtController;
