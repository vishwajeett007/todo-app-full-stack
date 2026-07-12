const express = require('express');
const app = express();
const cors = require('cors');
const pool = require("./db")
// const dotenv = require('dotenv').config();
// const http = require('http');
// const server = http.createServer(app);

//middlewares
app.use(cors());//use for allowing requests from different origins
app.use(express.json());//use for sending data from client to server in json format and also for url encoded data

//routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

//routes-get all todos
app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo")
        res.json(allTodos.rows);
    } catch (error) {
        console.log(error.message)
    }
})

//routes-get a todo
app.get("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
        res.json(todo.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
})
//routes-post a todo
app.post("/todos", async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", [description])
        res.json(newTodo.rows[0]);
    } catch (error) {
        console.error(error.message)
    }
})
//routes-put a todo
app.put("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2 RETURNING *", [description, id])
        res.json(updateTodo.rows[0]);
    } catch (error) {
        console.error(error.message);
    }
})

//routes-delete a todo
app.delete("/todos/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1 RETURNING *", [id]);
        res.json("Todo was deleted successfully");
    } catch (error) {
        console.error(error.message)
    }
})

app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT || 5000}`);
});