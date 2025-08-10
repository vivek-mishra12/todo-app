import React from 'react'

const Todoitems = ({text,id,isComplete, deleteTodo,toggle}) => {
  return (
    <div className='flex items-center my-3 gap-2'>
        <div onClick={()=>{toggle(id)}} className='flex flex-1 items-center cursor-pointer'>
            {
                isComplete?<i className="fa-solid fa-circle-check text-green-500 text-xl"></i>:<i className="fa-regular fa-circle text-xl"></i>
            }
            <p className={`text-slate-700 ml-4 text-[17px] decoration-slate-500 ${isComplete?"line-through" : ""}`}>
                {text}
            </p>
        </div>

        <i onClick={()=>{deleteTodo(id)}} className="fa-solid fa-trash cursor-pointer text-red-500 text-xl"></i>
    </div>
  )
}

export default Todoitems