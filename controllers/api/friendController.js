const express = require('express');
const router = express.Router();

module.exports = {
  // POST to add a new friend to a user's friend list
  addFriend: (User) => async (req, res) => {
    try {
      const userId = req.params.userId;
      const friendId = req.params.friendId;

      // Check if both users exist
      const user = await User.findById(userId);
      const friend = await User.findById(friendId);
      if (!user || !friend) {
        return res.status(404).json({ error: 'User or friend not found' });
      }

      // Prevent adding self as a friend or duplicate entry
      if (userId === friendId || user.friends.includes(friendId)) {
        return res.status(400).json({ error: 'Invalid friend request' });
      }

      // Add friend to user's list
      user.friends.push(friendId);
      await user.save();

      // Add user to friend's list (reciprocal friendship)
      friend.friends.push(userId);
      await friend.save();

      res.json({ message: 'Friend added successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to add friend' });
    }
  },

  // DELETE to remove a friend from a user's friend list
  removeFriend: (User) => async (req, res) => {
    try {
      const userId = req.params.userId;
      const friendId = req.params.friendId;

      // Find the user and remove the friend
      const user = await User.findByIdAndUpdate(
        userId,
        { $pull: { friends: friendId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Find the friend and remove the user (reciprocal friendship)
      await User.findByIdAndUpdate(
        friendId,
        { $pull: { friends: userId } },
        { new: true }
      );

      res.json({ message: 'Friend removed successfully' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to remove friend' });
    }
  },

};
