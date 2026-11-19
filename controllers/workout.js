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
    return res.status(200).json({ workout: workouts });
  } catch (error) {
    return errorHandler(error, req, res);
  }
}

/* stretch goals: 2nd priority */
exports.updateWorkout = async (req, res) => {
  try {
    const updates = {};
    if (req.body.name !== undefined) updates.name = req.body.name;
    if (req.body.duration !== undefined) updates.duration = req.body.duration;

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ message: 'Provide a name or duration to update' });
    }

    const updatedWorkout = await Workout.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedWorkout) {
      return res.status(404).json({ message: 'Workout not found' });
    }

    return res.status(200).json({
      message: 'Workout updated successfully',
      updatedWorkout
    });
  } catch (error) {
    return errorHandler(error, req, res);
  }
};

exports.deleteWorkout = async (req, res) => {
  await Workout.findOneAndDelete({ _id: req.params.id, userId: req.user.id })
  res.status(200).json({ message: 'Workout deleted successfully' })    
};

exports.completeWorkoutStatus = async (req, res) => {
  try {
    const workout = await Workout.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { $set: { status: 'Completed' } },
      { new: true, runValidators: true }
    );

    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }

    return res.status(200).json({
      message: 'Workout marked as completed successfully',
      workout
    });
  } catch (error) {
    return errorHandler(error, req, res);
  }
};
