const mongoose = require("mongoose");

const leaderSchema = mongoose.Schema({
	email: String,
	score: Number,
	quizId: mongoose.Schema.Types.ObjectId,
});

const BoardModel = mongoose.model("score", leaderSchema);

module.exports = BoardModel;
