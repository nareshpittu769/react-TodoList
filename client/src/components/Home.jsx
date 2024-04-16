import React, { useState } from "react";
import "./home.css";
import { ImRadioChecked, ImRadioUnchecked } from "react-icons/im";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, editTodo, deleteTodo,handleCheck } from "../features/todoSlice";

const Home = () => {
  const userList = useSelector((state) => state.todoList);
  const dispatch = useDispatch();
  const [todo, setTodo] = useState("");
  const [edit, setedit] = useState({ state: false, id: "" });

  const date = new Date().getTime();

  const initialState = {
    id: date,
    data: todo,
    completed: false,
  };

  return (
    <div className="home">
      <div className="container wrapper">
        <h1>Todo List</h1>
        <form action="">
          <input
            type="text"
            name="add"
            id="add"
            placeholder="Enter todo here"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          {edit.state ? (
            <button
              type="button"
              onClick={() => [
                dispatch(editTodo({ ...initialState, id: edit.id })),
                setedit({ state: false }),
                setTodo(""),
              ]}
            >
              Edit
            </button>
          ) : (
            <button
              type="button"
              onClick={() => [dispatch(addTodo(initialState)), setTodo("")]}
            >
              Add
            </button>
          )}
        </form>
        <ul className="viewItem">
          {userList.map((task) => (
            <li key={task.id}>
              <span
                style={
                  task.completed
                    ? { textDecoration: "line-through" }
                    : { textDecoration: "none" }
                }
                onClick={()=>dispatch(handleCheck(task.id))}
              >
                {task.completed ? <ImRadioChecked /> : <ImRadioUnchecked />}
                {task.data}
              </span>
              <span className="right">
                <button
                  type="button"
                  onClick={() => {
                    setedit({ state: true, id: task.id });
                    setTodo(task.data);
                  }}
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => dispatch(deleteTodo(task.id))}
                >
                  Delete
                </button>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
