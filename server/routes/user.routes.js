const { authJwt } = require('../middleware');
const controller = require('../controllers/user.controller');

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    })

    /**
     * @openapi
     * /test/all:
     *   get:
     *     tags:
     *       - Test
     *     summary: Accès public
     *     responses:
     *       200:
     *         description: Message disponible pour tous
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: "Contenu public."
     */
    app.get("/test/all", controller.allAccess);

    /**
     * @openapi
     * /test/user:
     *   get:
     *     tags:
     *       - Test
     *     summary: Accès protégé (utilisateur authentifié)
     *     security:
     *       - jwt: []
     *     responses:
     *       200:
     *         description: Message disponible pour un utilisateur connecté
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   example: "Contenu utilisateur."
     *       401:
     *         description: Jeton manquant ou invalide
     */
    app.get(
        "/test/user",
        [authJwt.verifyToken],
        controller.userAccess
    );
};
