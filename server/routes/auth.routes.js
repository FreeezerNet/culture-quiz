const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    /**
   * @openapi
   * /auth/signup:
   *   post:
   *     tags:
   *       - Auth
   *     summary: Inscription d'un nouvel utilisateur
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - firstName
   *               - lastName
   *               - emailId
   *               - password
   *             properties:
   *               firstName:
   *                 type: string
   *                 example: Jean
   *               lastName:
   *                 type: string
   *                 example: Dupont
   *               emailId:
   *                 type: string
   *                 format: email
   *                 example: jean.dupont@example.com
   *               password:
   *                 type: string
   *                 format: password
   *                 example: secret123
   *     responses:
   *       200:
   *         description: Utilisateur enregistré avec succès
   *       400:
   *         description: Nom d’utilisateur ou email déjà utilisé
   *       500:
   *         description: Erreur interne du serveur
   */
    app.post(
        "/auth/signup",
        [
            verifySignUp.checkDuplicateUsername
        ],
        controller.signup
    );

    /**
     * @openapi
     * /auth/signin:
     *   post:
     *     tags:
     *       - Auth
     *     summary: Connexion utilisateur
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             required:
     *               - emailId
     *               - password
     *             properties:
     *               emailId:
     *                 type: string
     *               password:
     *                 type: string
     *     responses:
     *       200:
     *         description: Jeton JWT renvoyé
     *       401:
     *         description: Mot de passe incorrect
     *       404:
     *         description: Utilisateur non trouvé
     */
    app.post("/auth/signin", controller.signin);

    /**
     * @openapi
     * /auth/refresh-token:
     *   post:
     *     tags:
     *       - Auth
     *     summary: Renouvellement du token d'accès
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               refreshToken:
     *                 type: string
     *     responses:
     *       200:
     *         description: Nouveau JWT et refresh token renvoyés
     *       403:
     *         description: Refresh token manquant, invalide ou expiré
     */
    app.post("/auth/refresh-token", controller.refreshToken);
}
