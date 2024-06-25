const express = require('express');
const router = express.Router();

module.exports = {
  // GET all users
  getAllUsers: (User) => async (req, res) => {
    try {
        console.log('Fetching users...'); // Log this message before fetching
        User.find()
            .populate('thoughts friends')
            .then((users) => {
                console.log('Query resolved successfully.');
                console.log('Number of users found:', users.length);
                res.json(users);
            })
            .catch(err => {
                console.error('Error fetching users:', err); // Log the error
                res.status(500).json({ error: 'Failed to fetch users' });
            });
    } catch (err) {
        console.error('Error before query execution:', err); // Log the error
        res.status(500).json({ error: 'Failed to fetch users' });
    }
  },

  // GET a single user by their ID
  getUserById: (User) => async (req, res) => {
    try {
      const user = await User.findById(req.params.userId).populate('thoughts friends');
      if (!user) return res.status(404).json({ error: 'User not found' });
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  },

  // POST a new user
  createUser: (User) => async (req, res) => {
    try {
      const newUser = await User.create(req.body);
      res.status(201).json(newUser);
    } catch (err) {
      res.status(500).json({ error: 'Failed to create user' });
    }
  },

  // PUT to update a user by their ID
  updateUser: (User) => async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        req.body,
        { new: true, runValidators: true }
      );
      if (!updatedUser) return res.status(404).json({ error: 'User not found' });
      res.json(updatedUser);
    } catch (err) {
      res.status(500).json({ error: 'Failed to update user' });
    }
  },

  // DELETE to remove user by their ID
  deleteUser: (User) => async (req, res) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.userId);
      if (!deletedUser) return res.status(404).json({ error: 'User not found' });
      res.json({ message: 'User deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete user' });
    }
  },

};
