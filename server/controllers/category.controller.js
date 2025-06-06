const db = require("../models");
const Category = db.category;
const Question = db.question;
const Answer = db.answer;

// Créer une nouvelle catégorie
exports.create = async (req, res) => {
    try {
        const category = await Category.create({
            name: req.body.name,
            description: req.body.description,
            imageUrl: req.body.imageUrl
        });
        res.status(201).send(category);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Une erreur est survenue lors de la création de la catégorie."
        });
    }
};

// Récupérer toutes les catégories
exports.findAll = async (req, res) => {
    try {
        const categories = await Category.findAll({
            include: [{
                model: Question,
                attributes: ['id']
            }]
        });
        res.send(categories);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Une erreur est survenue lors de la récupération des catégories."
        });
    }
};

// Récupérer une catégorie par son ID avec ses questions
exports.findOne = async (req, res) => {
    try {
        const category = await Category.findByPk(req.params.id, {
            include: [{
                model: Question,
                include: [{
                    model: Answer
                }]
            }]
        });
        if (!category) {
            return res.status(404).send({
                message: "Catégorie non trouvée."
            });
        }
        res.send(category);
    } catch (err) {
        res.status(500).send({
            message: err.message || "Une erreur est survenue lors de la récupération de la catégorie."
        });
    }
};
