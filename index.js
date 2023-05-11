const express = require("express");
const cors = require("cors");
const userRouter = require("./routes/user.routes");
const connectDB = require("./db");
const quizRouter = require("./routes/quiz.routes");
const boardRouter = require("./routes/board.routes");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.send("Home");
});

app.use("/user", userRouter);
app.use("/quiz", quizRouter);
app.use("/leaderboard", boardRouter);

app.listen(process.env.PORT, (req, res) => {
	connectDB();
	console.log("Server is running.");
});
