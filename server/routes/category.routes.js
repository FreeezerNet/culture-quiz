const express = require('express');
const { authJwt } = require('../middleware');
const controller = require('../controllers/category.controller');

const router = express.Router();

// Routes publiques
router.get('/', controller.findAll);
router.get('/:id', controller.findOne);

// Routes protégées (admin seulement)
router.post('/', [authJwt.verifyToken], controller.create);

module.exports = router;
