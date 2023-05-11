const express = require("express");
const QuizModel = require("../model/Quiza.model");

const quizRouter = express.Router();

quizRouter.get("/", async (req, res) => {
	try {
		let quiz_data = await QuizModel.find();
		res.status(200).send(quiz_data);
	} catch (error) {}
});

quizRouter.post("/create", async (req, res) => {
	try {
		let new_quiz = await QuizModel({ ...req.body });
		await new_quiz.save();
		res.sendStatus(200);
	} catch (error) {
		res.status(500).send(error);
	}
});

quizRouter.get("/:id", async (req, res) => {
	const id = req.params.id;
	try {
		let quiz_data = await QuizModel.findById(id);
		res.status(200).send(quiz_data);
	} catch (error) {
		res.status(500).send(error);
	}
});

quizRouter.patch("/:id", async (req, res) => {
	const id = req.params.id;
	const { email } = req.body;
	try {
		let check = await QuizModel.findById(id);
		console.log(email);
		if (check.creator === email) {
			await QuizModel.findByIdAndUpdate(id, {
				...req.body,
				creator: email,
			});
			res.sendStatus(200);
		} else {
			res.sendStatus(403);
		}
	} catch (error) {
		res.status(500).send(error);
	}
});
quizRouter.delete("/:id", async (req, res) => {
	const id = req.params.id;
	const { email } = req.body;
	try {
		let check = await QuizModel.findById(id);
		if (check.creator === email) {
			await QuizModel.findByIdAndDelete(id);
			res.sendStatus(200);
		} else {
			res.sendStatus(403);
		}
	} catch (error) {
		res.status(500).send(error);
	}
});

module.exports = quizRouter;
