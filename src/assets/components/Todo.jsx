import React, { useEffect, useRef, useState } from 'react'
import Todoitems from './Todoitems'

const Todo = () => {

const [todoList,setTodoList] = useState(localStorage.getItem("todos")?JSON.parse(localStorage.getItem("todos")):[]);  

const inputref = useRef();

const add = ()=>{
    const inputtext = inputref.current.value.trim();
    
    if(inputtext===""){
        return null;
    }
    
    const newTodo = {
        id: Date.now(),
        text: inputtext,
        isComplete: false,
    }

    setTodoList((prev)=>[...prev,newTodo]);
    inputref.current.value  = "";
}

const deleteTodo = (id)=>{
    setTodoList((prevTodos)=>{
        return prevTodos.filter((todo)=> todo.id!=id)
    })
}

const toggle = (id)=>{
    setTodoList((prevtodo)=>{
        return prevtodo.map((todo)=>{
            if(todo.id===id){
                return {...todo,isComplete:!todo.isComplete};
            }
            return todo;
        })
    })
}

useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todoList));

},[todoList])

  return (
    <div className='bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl'>
        {/* title */}

        <div className='flex items-center mt-7 gap-2'>
            <i className="fa-solid fa-clipboard-list text-3xl text-blue-500"></i>
            <h1 className='text-3xl font-semibold'>
                TO-DO List
            </h1>
        </div>

        {/* input */}

        <div className='flex items-center my-7 bg-gray-200 rounded-full'>
            <input ref={inputref} className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600' type="text" placeholder='Add your task'/>
            
            <button onClick={add} className='border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg font-medium cursor-pointer'>ADD +</button>
        </div>

        {/* todoList */}
        <div>
            {todoList.map((item,index)=>{
                return <Todoitems key={index} text={item.text} id={item.id} isComplete={item.isComplete} deleteTodo={deleteTodo}
                toggle={toggle}
                />
            })}
        </div>


    </div>
  )
}

export default Todo