const express = require('express');
const router = express.Router();

module.exports = {
  // GET all reactions (Optional, not part of acceptance criteria)
  getAllReactions: (Reaction) => async (req, res) => {
    try {
      const reactions = await Reaction.find();
      res.json(reactions);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch reactions' });
    }
  };

  // POST to create a reaction (stored on a thought)
  createReaction: (Reaction, Thought) => async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      if (!thought) return res.status(404).json({ error: 'Thought not found' });

      const reaction = await Reaction.create(req.body);
      thought.reactions.push(reaction);
      await thought.save();

      res.status(201).json(reaction);
    } catch (err) {
      res.status(500).json({ error: 'Failed to create reaction' });
    }
  };

  // DELETE to pull and remove a reaction by the reaction's _id value
  deleteReaction: (Thought) => async (req, res) => {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: req.params.reactionId } }, // Remove from array
        { new: true } // Return updated thought
      );

      if (!thought) return res.status(404).json({ error: 'Thought or reaction not found' });

      // Delete the reaction document itself (optional, for data cleanup)
      await Reaction.findByIdAndDelete(req.params.reactionId);

      res.json({ message: 'Reaction deleted successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete reaction' });
    }
  };

  return router;
};
