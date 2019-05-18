import axios from "axios";

// React pone una variable de entorno para saber el entorno y en base al entorno hacer peticiones al back
const isProduction = process.env.NODE_ENV === "production";
const base_url = isProduction ? "url_de_heroku" : "http://localhost:3000/api";

export const getTodos = () => {
  return axios
    .get(`${base_url}/todos`)
    .then(res => res.data.todos)
    .catch(err => err);
};

export const createTodo = todo => {
  // al devolver la funcion, se invoca y podemos manejar la promesa
  return (
    axios
      .post(`${base_url}/todos`, todo)
      // res.data tiene un objeto todo, para evitar el objeto sacamos de una vez todo de res.data
      .then(res => res.data.todo)
      .catch(err => err)
  );
};

export const deleteTodo = id => {
  // al devolver la funcion, se invoca y podemos manejar la promesa
  return (
    axios
      .delete(`${base_url}/todos/${id}`)
      // res.data tiene un objeto todo, para evitar el objeto sacamos de una vez todo de res.data
      .then(res => res.data.todo)
      .catch(err => err)
  );
};

export const editTodo = todo => {
  // al devolver la funcion, se invoca y podemos manejar la promesa
  return (
    axios
      .patch(`${base_url}/todos/${todo._id}`, todo)
      // res.data tiene un objeto todo, para evitar el objeto sacamos de una vez todo de res.data
      .then(res => res.data.todo)
      .catch(err => err)
  );
};
