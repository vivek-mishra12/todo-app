import React, { useEffect, useRef, useState } from 'react'
import Todoitems from './Todoitems'

const Todo = () => {
  const [todoList, setTodoList] = useState(
    localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : []
  );

  const inputref = useRef();

  const add = () => {
    const inputtext = inputref.current.value.trim();
    if (inputtext === "") {
      return null;
    }
    const newTodo = {
      id: Date.now(),
      text: inputtext,
      isComplete: false,
    };
    setTodoList((prev) => [...prev, newTodo]);
    inputref.current.value = "";
  };

  const deleteTodo = (id) => {
    setTodoList((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== id);
    });
  };

  const toggle = (id) => {
    setTodoList((prevtodo) => {
      return prevtodo.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isComplete: !todo.isComplete };
        }
        return todo;
      });
    });
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div className="bg-white flex flex-col p-5 sm:p-7 min-h-[500px] sm:min-h-[550px] rounded-xl shadow-lg">
      {/* title */}
      <div className="flex items-center mt-5 gap-2">
        <i className="fa-solid fa-clipboard-list text-2xl sm:text-3xl text-blue-500"></i>
        <h1 className="text-2xl sm:text-3xl font-semibold">TO-DO List</h1>
      </div>

      {/* input */}
      <div className="flex flex-col sm:flex-row items-center my-5 sm:my-7 bg-gray-200 rounded-full p-2 sm:p-0 gap-3 sm:gap-0">
        <input
          ref={inputref}
          className="bg-transparent border-0 outline-none flex-1 h-12 sm:h-14 pl-4 sm:pl-6 pr-2 placeholder:text-slate-600 text-base sm:text-lg"
          type="text"
          placeholder="Add your task"
        />

        <button
          onClick={add}
          className="border-none rounded-full bg-orange-600 w-full sm:w-32 h-12 sm:h-14 text-white text-base sm:text-lg font-medium cursor-pointer transition-all hover:bg-orange-700"
        >
          ADD +
        </button>
      </div>

      {/* todoList */}
      <div className="mt-4">
        {todoList.map((item, index) => {
          return (
            <Todoitems
              key={index}
              text={item.text}
              id={item.id}
              isComplete={item.isComplete}
              deleteTodo={deleteTodo}
              toggle={toggle}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Todo;
