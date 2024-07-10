// ? User Controller
const { User, Thought } = require("../models");

const userController = {
  // ? Get all users
  async getAllUsers(req, res) {
    try {
      // Retrieve all users, populate the thoughts and friends, and exclude the __v field.
      const users = await User.find({})
        .populate({ path: "thoughts", select: "-__v" })
        .populate({ path: "friends", select: "-__v" })
        .select("-__v");
      res.json(users);
    } catch (err) {
      // Return a 500 Internal Server Error if an error occurs.
      res.status(500).json(err);
    }
  },

  // ? Get a single user by id
  async getUserById(req, res) {
    try {
      // Retrieve a single user by its id, populate the thoughts and friends, and exclude the __v field.
      const user = await User.findOne({ _id: req.params.id })
        .populate({ path: "thoughts", select: "-__v" })
        .populate({ path: "friends", select: "-__v" })
        .select("-__v");
      if (!user) {
        // Return a 404 Not Found error if the user is not found.
        return res.status(404).json({ message: "No user found with this id!" });
      }
      res.json(user);
    } catch (err) {
      // Return a 500 Internal Server Error if an error occurs.
      res.status(500).json(err);
    }
  },

  // ? Create a new user
  async createUser(req, res) {
    try {
      // Create a new user based on the request body.
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      // Return a 400 Bad Request error if an error occurs.
      res.status(400).json(err);
    }
  },

  // ? Update a user by id
  async updateUser(req, res) {
    try {
      // Find the user by id and update it with the request body, using the new: true and runValidators: true options.
      const user = await User.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
      );
      if (!user) {
        // Return a 404 Not Found error if the user is not found.
        return res.status(404).json({ message: "No user found with this id!" });
      }
      res.json(user);
    } catch (err) {
      // Return a 400 Bad Request error if an error occurs.
      res.status(400).json(err);
    }
  },

  // ? Delete a user by id
  async deleteUser(req, res) {
    try {
      // Find the user by id and delete it.
      const user = await User.findOneAndDelete({ _id: req.params.id });
      if (!user) {
        // Return a 404 Not Found error if the user is not found.
        return res.status(404).json({ message: "No user found with this id!" });
      }

      // Remove user's thoughts
      await Thought.deleteMany({ _id: { $in: user.thoughts } });
      res.json({ message: "User and associated thoughts deleted!" });
    } catch (err) {
      // Return a 500 Internal Server Error if an error occurs.
      res.status(500).json(err);
    }
  },

  // ? Add a friend to a user's friend list
  async addFriend(req, res) {
    try {
      // Find the user by id and add the specified friend to the user's friends array.
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );
      if (!user) {
        // Return a 404 Not Found error if the user is not found.
        return res.status(404).json({ message: "No user found with this id!" });
      }
      res.json(user);
    } catch (err) {
      // Return a 500 Internal Server Error if an error occurs.
      res.status(500).json(err);
    }
  },

  // ? Remove a friend from a user's friend list
  async removeFriend(req, res) {
    try {
      // Find the user by id and remove the specified friend from the user's friends array.
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
      if (!user) {
        // Return a 404 Not Found error if the user is not found.
        return res.status(404).json({ message: "No user found with this id!" });
      }
      res.json(user);
    } catch (err) {
      // Return a 500 Internal Server Error if an error occurs.
      res.status(500).json(err);
    }
  },
};

module.exports = userController;
