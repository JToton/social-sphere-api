const { Thought, User } = require("../models");

const thoughtController = {
  // Get all thoughts
  async getAllThoughts(req, res) {
    try {
      const thoughts = await Thought.find({})
        .populate({ path: "reactions", select: "-__v" })
        .select("-__v");
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get a single thought by id
  async getThoughtById(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.id })
        .populate({ path: "reactions", select: "-__v" })
        .select("-__v");
      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found with this id!" });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Create a new thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: thought._id } },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: "No user found with this id!" });
      }
      res.json(thought);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // Update a thought by id
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
      );
      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found with this id!" });
      }
      res.json(thought);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // Delete a thought by id
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.id });
      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found with this id!" });
      }
      await User.findOneAndUpdate(
        { thoughts: req.params.id },
        { $pull: { thoughts: req.params.id } },
        { new: true }
      );
      res.json({ message: "Thought deleted!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Create a reaction
  async createReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { new: true, runValidators: true }
      );
      if (!thought) {
        return res
          .status(404)
          .json({ message: "No thought found with this id!" });
      }
      res.json(thought);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // Delete a reaction
  async deleteReaction(req, res) {
    try {
      const reactiondata = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true, runValidators: true }
      );
      if (!reactiondata) {
        return res
          .status(404)
          .json({ message: "No thought found with this id!" });
      }
      res.json(reactiondata);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = thoughtController;
