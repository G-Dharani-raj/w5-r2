const express = require("express");
const BoardModel = require("../model/Board.model");

const boardRouter = express.Router();

boardRouter.get("/:id", async (req, res) => {
	const quizId = req.params.id;
	try {
		let board_data = await BoardModel.find({ quizId }).sort({
			score: "desc",
		});
		res.status(200).send(board_data);
	} catch (error) {
		res.status(500).send(error);
	}
});

boardRouter.post("/score", async (req, res) => {
	try {
		let new_score = new BoardModel({ ...req.body });
		await new_score.save();
		res.sendStatus(200);
	} catch (error) {
		res.status(500).send(error);
	}
});
module.exports = boardRouter;
