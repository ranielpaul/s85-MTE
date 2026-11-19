const Workout = require('../models/Workout');
const { errorHandler } = require('../auth');

exports.addWorkout = async (req, res) => {
  try {
    const workout = await Workout.create({
      name: req.body.name,
      duration: req.body.duration,
      userId: req.user.id
    });

    return res.status(201).json(workout);
  } catch (error) {
    return errorHandler(error, req, res);
  }
}

exports.getMyWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ userId: req.user.id }).sort({ createdAt: -1 })
    return res.status(200).json(workouts);
  } catch (error) {
    return errorHandler(error, req, res);
  }
}

/* stretch goals: 2nd priority
exports.updateWorkout = async (req, res) => {
  const job = await Job.findOneAndUpdate(
    { _id: req.params.id, createdBy: req.user.id },
    req.body,
    { new: true }
  )
  res.status(200).json(job)
}
};

exports.deleteWorkout = async (req, res) => {
  await Job.findOneAndDelete({ _id: req.params.id, createdBy: req.user.id })
  res.status(200).json({ message: 'Job deleted' })    
};

exports.completeWorkoutStatus = async (req, res) => {
    res.status(200).
};
*/