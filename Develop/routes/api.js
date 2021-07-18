const db = require("../models");
const router = require("express").Router();

// Get workouts
router.get("/api/workouts", (req, res) => {

    db.Workout.find({}).then(dbWorkout => {
        // console.log("All workouts");
        // console.log(dbWorkout);
        dbWorkout.forEach(workout => {
            var total = 0;
            workout.exercises.forEach(e => {
                total += e.duration;
            });
            workout.totalDuration = total;
        });
        res.json(dbWorkout);
    }).catch(err => {
        res.json(err);
    });
});

// Add exercise
router.put("/api/workouts/:id", (req, res) => {

    db.Workout.findOneAndUpdate(
        { _id: req.params.id },
        {
            $inc: { totalDuration: req.body.duration },
            $push: { exercises: req.body }
        },
        { new: true }).then(dbWorkout => {
            res.json(dbWorkout);
        }).catch(err => {
            res.json(err);
        });
});

// Create workout
router.post("/api/workouts", ({ body }, res) => {
    // console.log("Workout to be added");
    // console.log(body);
    db.Workout.create(body).then((dbWorkout => {
        res.json(dbWorkout);
    })).catch(err => {
        res.json(err);
    });
});

// Get workouts in range
router.get("/api/workouts/range", (req, res) => {
    db.Workout.find({}).then(dbWorkout => {
        console.log("ALL WORKOUTS");
        console.log(dbWorkout);
        res.json(dbWorkout);
    }).catch(err => {
        res.json(err);
    });
});

module.exports = router;

//comment in to prepopulate database
// db.Workout.find({}).then(function (res) {
//     console.log("Checking if db is populated");
//     if (res.length === 0) {
//         console.log("DB is empty");
//         require("./seeders/seed.js");
//     }
// });