const express = require("express");

const {
    createTask,
    getTask,
    updateTask,
    deleteTask,
    getTasks,
} = require("../controllers/taskController");


const router = express.Router();

router.post("/", createTask);

router.get("/", getTasks);

router.put("/:id", updateTask);

router.delete("/:id", deleteTask);

module.exports = router;