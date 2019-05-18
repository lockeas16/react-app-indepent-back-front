const express = require("express");
const router = express.Router();
const Todo = require("../models/ToDo");

// GET Users
router.get("/", (req, res) => {
  Todo.find()
    .then(todos => {
      res.status(200).json({ todos });
    })
    .catch(error => {
      res.status(500).json({ error, message: "Error al buscar los usuarios" });
    });
});

// GET Todo
router.get("/:id", (req, res) => {
  const { id } = req.params;
  Todo.findById(id)
    .then(todo => {
      res.status(200).json({ todo });
    })
    .catch(error => {
      res.status(404).json({ error, message: "Error al buscar el todo" });
    });
});

//POST Todo
router.post("/", (req, res) => {
  Todo.create(req.body)
    .then(todo => {
      res.status(201).json({ todo });
    })
    .catch(error => {
      res.status(500).json({ error, message: "No se pudo crear el todo" });
    });
});

//Update TODO
router.patch("/:id", (req, res) => {
  const { id } = req.params;
  // devuelve el objeto actualizado
  Todo.findByIdAndUpdate(id, { $set: req.body }, { new: true })
    .then(todo => {
      res.status(200).json({ todo });
    })
    .catch(error => {
      res.status(500).json({ error, message: "Error al editar el todo" });
    });
});

//Delete Todo
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  // devuelve el objeto actualizado
  Todo.findByIdAndDelete(id)
    .then(todo => {
      res.status(200).json({ todo });
    })
    .catch(error => {
      res.status(500).json({ error, message: "Error al eliminar el todo" });
    });
});

module.exports = router;
