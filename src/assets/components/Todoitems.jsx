import React from 'react'

const Todoitems = ({ text, id, isComplete, deleteTodo, toggle }) => {
  return (
    <div className="flex items-center my-3 gap-2 sm:gap-4 flex-wrap">
      {/* Toggle complete */}
      <div
        onClick={() => { toggle(id) }}
        className="flex flex-1 items-center cursor-pointer"
      >
        {isComplete ? (
          <i className="fa-solid fa-circle-check text-green-500 text-lg sm:text-xl"></i>
        ) : (
          <i className="fa-regular fa-circle text-lg sm:text-xl"></i>
        )}

        <p
          className={`text-slate-700 ml-3 sm:ml-4 text-sm sm:text-base md:text-lg decoration-slate-500 ${
            isComplete ? "line-through" : ""
          }`}
        >
          {text}
        </p>
      </div>

      {/* Delete icon */}
      <i
        onClick={() => { deleteTodo(id) }}
        className="fa-solid fa-trash cursor-pointer text-red-500 text-lg sm:text-xl hover:scale-110 transition-transform"
      ></i>
    </div>
  )
}

export default Todoitems
