const router = require('express').Router();
const thoughtController = require('../controllers/api/thoughtController');

router.get('/', thoughtController.getAllThoughts);
router.get('/:thoughtId', thoughtController.getThoughtById);
router.post('/', thoughtController.createThought);
router.put('/:thoughtId', thoughtController.updateThought);
router.delete('/:thoughtId', thoughtController.deleteThought);

module.exports = (Thought) => {
  router.get('/', thoughtController.getAllThoughts(Thought));
  router.get('/:thoughtId', thoughtController.getThoughtById(Thought));
  router.post('/', thoughtController.createThought(Thought));
  router.put('/:thoughtId', thoughtController.updateThought(Thought));
  router.delete('/:thoughtId', thoughtController.deleteThought(Thought));

  return router;
};
