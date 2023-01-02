import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, makeFavoriteTodo, removeTodo } from "./features/features";

const Todos = () => {
  const todos = useSelector((state) => state.todos);
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  
  const handleFavorite = (id) => {
    dispatch(makeFavoriteTodo(id))
  };

  const handleRemove = (id) => {
    dispatch(removeTodo(id));
  };

  return (
    <div className="container">
      {loading && <div>...Загрузка </div>}
      {todos.map((item, index) => {
        return (
          <div className={item.isComplete ? "setTodo" : "todo"}>
            <button
              className={item.isComplete ? "noFavorite" : "favorite"}
              onClick={() => handleFavorite(item._id)}
            >
              ☆
            </button>
            <div className="text">{item.text}</div>
            <button onClick={() => handleRemove(item._id)} className="delete">
              🗑
            </button>
          </div>
        );
      })}
    </div>
  );
};
export default Todos;
