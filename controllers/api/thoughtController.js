const express = require('express');
const router = express.Router();

module.exports = {
  // GET all thoughts
  getAllThoughts: (Thought) => async (req, res) => {
    try {
      const thoughts = await Thought.find().populate('reactions'); 
      res.json(thoughts);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch thoughts' });
    }
  };

  // GET a single thought by its ID
  getThoughtById: (Thought) => async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId).populate('reactions');
      if (!thought) return res.status(404).json({ error: 'Thought not found' });
      res.json(thought);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch thought' });
    }
  };

  // POST a new thought
  createThought: (Thought) => async (req, res) => {
    try {
      const newThought = await Thought.create(req.body);

      // Assuming you have a 'username' field in the request body
      const userId = req.body.userId; // Replace with how you identify the user

      // Find the user and add the thought to their thoughts array
      await User.findByIdAndUpdate(userId, { $push: { thoughts: newThought._id } });

      res.status(201).json(newThought);
    } catch (err) {
      res.status(500).json({ error: 'Failed to create thought' });
    }
  };

  // PUT to update a thought by its ID
  updateThought: (Thought) => async (req, res) => {
    try {
      const updatedThought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        req.body,
        { new: true, runValidators: true }
      );
      if (!updatedThought) return res.status(404).json({ error: 'Thought not found' });
      res.json(updatedThought);
    } catch (err) {
      res.status(500).json({ error: 'Failed to update thought' });
    }
  };

  // DELETE to remove thought by its ID
  deleteThought: (Thought) => async (req, res) => {
    try {
      const deletedThought = await Thought.findByIdAndDelete(req.params.thoughtId);
      if (!deletedThought) return res.status(404).json({ error: 'Thought not found' });

      // Assuming you have a 'userId' field in the deletedThought object
      const userId = deletedThought.userId; // Replace with how you get the user ID

      // Find the user and remove the thought from their thoughts array
      await User.findByIdAndUpdate(userId, { $pull: { thoughts: deletedThought._id } });

      res.json({ message: 'Thought deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete thought' });
    }
  };
  
  return router;
};
