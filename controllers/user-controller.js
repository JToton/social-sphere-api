const { User, Thought } = require("../models");

const userController = {
  // Get all users
  async getAllUsers(req, res) {
    try {
      const users = await User.find({})
        .populate({ path: "thoughts", select: "-__v" })
        .populate({ path: "friends", select: "-__v" })
        .select("-__v");
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Get a single user by id
  async getUserById(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.id })
        .populate({ path: "thoughts", select: "-__v" })
        .populate({ path: "friends", select: "-__v" })
        .select("-__v");
      if (!user) {
        return res.status(404).json({ message: "No user found with this id!" });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // Update a user by id
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
      );
      if (!user) {
        return res.status(404).json({ message: "No user found with this id!" });
      }
      res.json(user);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  // Delete a user by id
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.id });
      if (!user) {
        return res.status(404).json({ message: "No user found with this id!" });
      }

      // Remove user's thoughts
      await Thought.deleteMany({ _id: { $in: user.thoughts } });
      res.json({ message: "User and associated thoughts deleted!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Add a friend to a user's friend list
  async addFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: "No user found with this id!" });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Remove a friend from a user's friend list
  async removeFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ message: "No user found with this id!" });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = userController;
