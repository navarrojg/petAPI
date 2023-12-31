const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");

const petRoutes = require("./routes/pets");
const userRoutes = require("./routes/user");
const cors = require("cors");

const app = express();

mongoose
	.connect(
		"mongodb+srv://tarasbasket:" +
			process.env.MONGO_ATLAS_PW +
			"@pets.oe3t9we.mongodb.net/node-angular?retryWrites=true&w=majority"
	)
	.then(() => {
		console.log("Connected to database!");
	})
	.catch(() => {
		console.log("Connection failed");
	});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images/pets-images", express.static(path.join("images/pets-images")));

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization"
	);
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PATCH, PUT, DELETE, OPTIONS"
	);
	next();
});

app.use("/api/pets", petRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
