const router = require('express').Router({ mergeParams: true }); // Enable merged params
const reactionController = require('../controllers/api/reactionController');

router.get('/', reactionController.getAllReactions); // Optional, not in acceptance criteria
router.post('/:thoughtId/reactions', reactionController.createReaction);
router.delete('/:thoughtId/reactions/:reactionId', reactionController.deleteReaction);

module.exports = (Reaction, Thought) => { // Pass both Reaction and Thought models
  router.get('/', reactionController.getAllReactions(Reaction)); 
  router.post('/:thoughtId/reactions', reactionController.createReaction(Reaction, Thought));
  router.delete('/:thoughtId/reactions/:reactionId', reactionController.deleteReaction(Thought));

  return router;
};
