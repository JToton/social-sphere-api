// ? Thought Controller
const { Thought, User } = require("../models");

const thoughtController = {
  // ? Get all thoughts
  async getAllThoughts(req, res) {
    try {
      // Retrieve all thoughts, populate the reactions, and exclude the __v field.
      const thoughts = await Thought.find({})
        .populate({ path: "reactions", select: "-__v" })
        .select("-__v");
      res.json(thoughts);
    } catch (err) {
      // Return a 500 Internal Server Error if an error occurs.
      res.status(500).json(err);
    }
  },

  // ? Get a single thought by id
  async getThoughtById(req, res) {
    try {
      // Retrieve a single thought by its id, populate the reactions, and exclude the __v field.
      const thought = await Thought.findOne({ _id: req.params.id })
        .populate({ path: "reactions", select: "-__v" })
        .select("-__v");
      if (!thought) {
        // Return a 404 Not Found error if the thought is not found.
        return res
          .status(404)
          .json({ message: "No thought found with this id!" });
      }
      res.json(thought);
    } catch (err) {
      // Return a 500 Internal Server Error if an error occurs.
      res.status(500).json(err);
    }
  },

  // ? Create a new thought
  async createThought(req, res) {
    try {
      // Create a new thought based on the request body.
      const thought = await Thought.create(req.body);
      // Find the user associated with the new thought and add the thought's _id to the user's thoughts array.
      const user = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: thought._id } },
        { new: true }
      );
      if (!user) {
        // Return a 404 Not Found error if the user is not found.
        return res.status(404).json({ message: "No user found with this id!" });
      }
      res.json(thought);
    } catch (err) {
      // Return a 400 Bad Request error if an error occurs.
      res.status(400).json(err);
    }
  },

  // ? Update a thought by id
  async updateThought(req, res) {
    try {
      // Find the thought by id and update it with the request body, using the new: true and runValidators: true options.
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
      );
      if (!thought) {
        // Return a 404 Not Found error if the thought is not found.
        return res
          .status(404)
          .json({ message: "No thought found with this id!" });
      }
      res.json(thought);
    } catch (err) {
      // Return a 400 Bad Request error if an error occurs.
      res.status(400).json(err);
    }
  },

  // ? Delete a thought by id
  async deleteThought(req, res) {
    try {
      // Find the thought by id and delete it.
      const thought = await Thought.findOneAndDelete({ _id: req.params.id });
      if (!thought) {
        // Return a 404 Not Found error if the thought is not found.
        return res
          .status(404)
          .json({ message: "No thought found with this id!" });
      }
      // Remove the deleted thought's _id from the associated user's thoughts array.
      await User.findOneAndUpdate(
        { thoughts: req.params.id },
        { $pull: { thoughts: req.params.id } },
        { new: true }
      );
      res.json({ message: "Thought deleted!" });
    } catch (err) {
      // Return a 500 Internal Server Error if an error occurs.
      res.status(500).json(err);
    }
  },

  // ? Create a reaction
  async createReaction(req, res) {
    try {
      // Find the thought by its id and add the new reaction to its reactions array.
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { new: true, runValidators: true }
      );
      if (!thought) {
        // Return a 404 Not Found error if the thought is not found.
        return res
          .status(404)
          .json({ message: "No thought found with this id!" });
      }
      res.json(thought);
    } catch (err) {
      // Return a 400 Bad Request error if an error occurs.
      res.status(400).json(err);
    }
  },

  // ? Delete a reaction
  async deleteReaction(req, res) {
    try {
      // Find the thought by its id and remove the specified reaction from its reactions array.
      const reactiondata = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true, runValidators: true }
      );
      if (!reactiondata) {
        // Return a 404 Not Found error if the thought is not found.
        return res
          .status(404)
          .json({ message: "No thought found with this id!" });
      }
      res.json(reactiondata);
    } catch (err) {
      // Return a 500 Internal Server Error if an error occurs.
      res.status(500).json(err);
    }
  },
};

module.exports = thoughtController;
