const express = require("express");
const UserModel = require("../model/User.model");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
	const { email, password } = req.body;
	try {
		let check = await UserModel.find({ email });
		if (check.length) {
			res.sendStatus(403);
		} else {
			bcrypt.hash(password, 5, async (err, hash) => {
				const new_user = new UserModel({
					email,
					password: hash,
				});
				await new_user.save();
				res.sendStatus(200);
			});
		}
	} catch (error) {
		res.status(500).send(error);
	}
});

userRouter.post("/signin", async (req, res) => {
	const { email, password } = req.body;
	try {
		let user_data = await UserModel.find({ email });
		if (user_data.length) {
			bcrypt.compare(
				password,
				user_data[0].password,
				async (err, result) => {
					if (err) res.status(500).send(err);
					else if (result) {
						const token = jwt.sign({ email }, process.env.JWTS);
						res.status(200).send(token);
					} else {
						res.sendStatus(401);
					}
				}
			);
		} else {
			res.sendStatus(404);
		}
	} catch (error) {
		res.status(500).send(error);
	}
});
module.exports = userRouter;
