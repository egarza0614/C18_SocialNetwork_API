const router = require('express').Router();
const friendController = require('../controllers/api/friendController');

router.post('/:userId/friends/:friendId', friendController.addFriend);
router.delete('/:userId/friends/:friendId', friendController.removeFriend);

module.exports = (User) => {
  router.post('/:userId/friends/:friendId', friendController.addFriend(User));
  router.delete('/:userId/friends/:friendId', friendController.removeFriend(User));

  return router;
};
