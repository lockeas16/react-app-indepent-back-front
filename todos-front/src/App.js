import React, { Component } from "react";
import "./App.css";
import UIkit from "uikit";

// Services
import { createTodo, getTodos, deleteTodo, editTodo } from "./services/todos";

// Components
import TodoForm from "./components/Todo/TodoForm";
import TodoList from "./components/Todo/TodoList";

class App extends Component {
  componentDidMount() {
    getTodos()
      .then(todos => {
        todos.reverse();
        this.setState({ todos });
      })
      .catch(error => {
        UIkit.notification({
          message: `<span uk-icon="icon:close"></span>${error.message}`,
          status: "danger",
          pos: "top-left"
        });
        this.setState({ error: error.message });
      });
  }

  state = {
    todo: {
      body: "",
      priority: "low"
    },
    todos: []
  };

  setTodo = todo => {
    this.setState({ todo });
  };

  handleChange = e => {
    const { todo } = this.state;
    const field = e.target.name;
    //creando una propiedad de manera dinamica
    todo[field] = e.target.value;
    this.setState({ todo });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { todo, todos } = this.state;
    if (!todo.body.length)
      return this.setState({ error: "Debes agregar una tarea" });
    const index = todos.findIndex(t => t._id === todo._id);
    // de tener un id, editamos
    todo._id ? this.onEditTodo(index) : this.onCreateTodo();
  };

  onEditTodo = index => {
    let { todos, todo } = this.state;
    //mandamos al back la creacion del todo
    editTodo(todo)
      .then(todo => {
        // guardamos el todo en el arreglo
        todos.splice(index, 1, todo);
        // limpiamos el objeto
        todo = {
          body: "",
          priority: "low"
        };
        // actualizamos el state e inicializamos el error
        this.setState({ todos, todo, error: undefined });
      })
      .catch(error => {
        this.setState({ error: error.message });
      });
  };

  onCreateTodo = () => {
    let { todos, todo } = this.state;
    //mandamos al back la creacion del todo
    createTodo(todo)
      .then(todo => {
        // guardamos el todo en el arreglo
        todos.unshift(todo);
        // limpiamos el objeto
        todo = {
          body: "",
          priority: "low"
        };
        // actualizamos el state e inicializamos el error
        this.setState({ todos, todo, error: undefined });
      })
      .catch(error => {
        this.setState({ error: error.message });
      });
  };

  handleDelete = (e, index) => {
    let { todos } = this.state;
    deleteTodo(todos[index]._id).then(todo => {
      todos.splice(index, 1);
      UIkit.notification({
        message: `<div class="uk-text-center"><span uk-icon="icon:check"></span>${
          todo._id
        } eliminado con exito</div>`,
        status: "success",
        pos: "top-right"
      });
      this.setState({ todos });
    });
  };

  render() {
    const { todo, todos, error } = this.state;
    return (
      <div className="App">
        <h1>ToDos</h1>
        <section className="uk-section">
          <div className="uk-container">
            <div className="uk-grid-match uk-child-width-1-2" uk-grid="true">
              <div>
                <TodoForm
                  {...todo}
                  error={error}
                  handleChange={this.handleChange}
                  handleSubmit={this.handleSubmit}
                />
              </div>
              <div>
                <TodoList
                  todos={todos}
                  handleDelete={this.handleDelete}
                  setTodo={this.setTodo}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
