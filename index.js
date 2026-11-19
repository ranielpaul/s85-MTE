const express = require("express");
const mongoose = require("mongoose");

// Port Number
const port = 4000;

// Server
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// MongoDB connection:
mongoose.connect("mongodb+srv://admin:admin1234@b645-miranda.9rsgnb9.mongodb.net/InventoryManagementSystem")

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