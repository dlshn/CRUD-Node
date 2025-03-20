const express = require('express');
const router = express.Router();
const customerController = require('../controller/CustomerController');
const verifyToken = require('../middleware/verifyToken');

router.post('/create',verifyToken,customerController.create);
router.get('/find/:id',verifyToken, customerController.findOneById);
router.delete('/delete/:id',verifyToken, customerController.deleteOneById);
router.put('/update/:id',verifyToken, customerController.updateById);
router.get('/search',verifyToken, customerController.search);


module.exports = router;