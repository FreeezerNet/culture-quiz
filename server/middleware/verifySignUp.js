const db = require("../models");
const User = db.user;
checkDuplicateUsername = (req, res, next) => {
    User.findOne({
        where: {
            emailId: req.body.email
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "Echoué! Cet email est déjà utilisé!"
            });
            return;
        }
        next();
    });
};
const verifySignUp = {
    checkDuplicateUsername: checkDuplicateUsername
};
module.exports = verifySignUp;
