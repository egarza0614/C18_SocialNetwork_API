// routes/userRoutes.js
const router = require('express').Router();
const userController = require('../controllers/api/userController');

// Define the routes, but don't pass the User model yet
router.get('/', (req, res) => userController.getAllUsers(req, res));
router.get('/:userId', (req, res) => userController.getUserById(req, res));
router.post('/', (req, res) => userController.createUser(req, res));
router.put('/:userId', (req, res) => userController.updateUser(req, res));
router.delete('/:userId', (req, res) => userController.deleteUser(req, res));

module.exports = (User) => {
  // The User model is now available here

  // Modify the controller functions to accept req and res
  userController.getAllUsers = userController.getAllUsers(User);
  userController.getUserById = userController.getUserById(User);
  userController.createUser = userController.createUser(User);
  userController.updateUser = userController.updateUser(User);
  userController.deleteUser = userController.deleteUser(User);

  return router;
};
