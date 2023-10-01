const express = require('express');
const routers = express.Router();
const userController =require('../controllers/userController');

//create, find, update, delete
routers.get('/', userController.view);
routers.post('/', userController.find);
routers.get('/adduser', userController.addUserForm);
routers.post('/create', userController.createUser);
routers.get('/edituser/:id', userController.editUserForm);
routers.post('/edituser/:id', userController.update);
routers.get('/userDetails/:id', userController.singleUser);
routers.get('/:id', userController.delete);


module.exports = routers