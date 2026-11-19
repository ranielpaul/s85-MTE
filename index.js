const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const port = process.env.PORT || 4000;
const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
	throw new Error("MONGODB_URI is required. Set it in your .env file.");
}

// Server
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// MongoDB connection:
mongoose.connect(mongoUri)

// Monitor the status of the db connection:
db = mongoose.connection;
db.on("err", () => console.error("Connection to the db failed"));
db.once("open", () => console.log("Now connected to the MongoDB Atlas."))

//Routes Middleware
const workoutRoutes = require("./routes/workout");
const userRoutes = require("./routes/user");


app.use("/workouts", workoutRoutes);
app.use("/users", userRoutes);


if(require.main === module){
	app.listen(port, () => {
	    console.log(`API is now online on port ${port}`)
	});
}


module.exports = {app,mongoose};