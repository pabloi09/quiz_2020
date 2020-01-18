const Sequelize = require("sequelize");
const {models} = require("../models");


// Autoload the tip with id equals to :tipId
exports.load = async (req, res, next, tipId) => {

    try {
        const tip = await models.tip.findByPk(tipId);
        if (tip) {
            req.tip = tip;
            next();
        } else {
            throw new Error('There is no tip with tipId=' + tipId);
        }
    } catch (error) {
        next(error);
    }
};


// MW - No se pueden crear mas de 50 tips por quiz
exports.limitPerQuiz = async (req, res, next) => {

    const LIMIT_PER_QUIZ = 50;

    let countOptions = {
        where: {
            quizId: req.quiz.id
        }
    };

    try {
        const count = await models.tip.count(countOptions);

        if (count < LIMIT_PER_QUIZ) {
            next();
        } else {
            req.flash('error', `Maximun ${LIMIT_PER_QUIZ} tips (accepted and non accepted) per quiz.`);
            res.redirect('back');
        }
    } catch (error) {
        next(error);
    }
};


// POST /quizzes/:quizId/tips
exports.create = async (req, res, next) => {

    const tip = models.tip.build({
        text: req.body.text,
        quizId: req.quiz.id
    });

    try {
        await tip.save();
        req.flash('success', 'Tip created successfully.');
        res.redirect("back");
    } catch (error) {
        if (error instanceof Sequelize.ValidationError) {
            req.flash('error', 'There are errors in the form:');
            error.errors.forEach(({message}) => req.flash('error', message));
            res.redirect("back");
        } else {
            req.flash('error', 'Error creating the new tip: ' + error.message);
            next(error);
        }
    }
};


// GET /quizzes/:quizId/tips/:tipId/accept
exports.accept = async (req, res, next) => {

    const {tip} = req;

    tip.accepted = true;

    try {
        await tip.save(["accepted"]);
        req.flash('success', 'Tip accepted successfully.');
        res.redirect('back');
    } catch (error) {
        req.flash('error', 'Error accepting the tip: ' + error.message);
        next(error);
    }
};


// DELETE /quizzes/:quizId/tips/:tipId
exports.destroy = async (req, res, next) => {

    try {
        await req.tip.destroy();
        req.flash('success', 'tip deleted successfully.');
        res.redirect('back');
    } catch (error) {
        next(error);
    }
};

