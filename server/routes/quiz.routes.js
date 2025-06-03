const express = require('express');
const { authJwt } = require('../middleware');
const controller = require('../controllers/quiz.controller');

const router = express.Router();

// Route pour obtenir les questions d'une catégorie
router.get('/category/:categoryId/questions', [authJwt.verifyToken], controller.getQuestionsByCategory);

// Route pour soumettre les réponses et obtenir le score
router.post('/submit', [authJwt.verifyToken], controller.submitQuiz);

module.exports = router;
