const express = require('express');
const { verifySignUp, authJwt } = require('../middleware');
const controller = require('../controllers/auth.controller');

const router = express.Router();

// (optionnel) en-têtes CORS spécifiques
router.use((req, res, next) => {
    res.header(
        'Access-Control-Allow-Headers',
        'x-access-token, Origin, Content-Type, Accept'
    );
    next();
});

// POST /api/auth/signup
router.post(
    '/signup',
    [verifySignUp.checkDuplicateUsername],
    controller.signup
);

// POST /api/auth/signin
router.post(
    '/signin',
    controller.signin
);

// POST /api/auth/refresh-token
router.post(
    '/refresh-token',
    [authJwt.verifyToken],
    controller.refreshToken
);

module.exports = router;
