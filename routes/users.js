const express = require('express');

const userController = require('../controllers/users');
const authController = require('../controllers/auth');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.route('/')
    .get(userController.getUsers)
    .post(userController.createUser);

router.route('/:id')
    .get(userController.getUser)
    .put(userController.updateUser)
    .delete(userController.deleteUser);

module.exports = router;