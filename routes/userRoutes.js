// routes/userRoutes.js
const router = require('express').Router();
const userController = require('../controllers/api/userController');

router.get('/', userController.getAllUsers);
router.get('/:userId', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:userId', userController.updateUser);
router.delete('/:userId', userController.deleteUser);

module.exports = (User) => {
  // Pass the User model to the controller functions
  router.get('/', userController.getAllUsers(User));
  router.get('/:userId', userController.getUserById(User));
  router.post('/', userController.createUser(User));
  router.put('/:userId', userController.updateUser(User));
  router.delete('/:userId', userController.deleteUser(User));

  return router;
};
