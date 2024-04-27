import React, { useEffect, useState } from 'react';

function Todo() {

  function getStorage() {
    let data = localStorage.getItem("todos");
    let json = JSON.parse(data);
    if (json) {
      return json;
    }
    return [];
  }
  const [todos, setTodos] = useState(
   getStorage()
  );
  useEffect(()=>{localStorage.setItem("todos",JSON.stringify(todos))},[todos])

  function handle(event) {
    event.preventDefault();
    let task = event.target[0].value;
   if(!task){
    alert("please correct task enter");
    return;
   }
   setTodos([...todos,{task:task,completed:false}])
    event.target[0].value='';
  }

  function checkStatus(index) {
    let newtodos = [...todos];
    newtodos[index].completed = !newtodos[index].completed; // Fix the typo here
    setTodos(newtodos);
  }
   function deletestaus(index){
    let newtodos = [...todos];
    newtodos.splice(index,1);
    setTodos(newtodos);
   }

  return (
    <div className='container my-5'>
      <div className='mx-auto rounded border p-4' style={{ width: "500px", backgroundColor: "#eb21d6" }}>
        <h2 className='text-white text-center mb-5'>Todo list</h2>

        <form className="d-flex" onSubmit={handle}>
          <input className="form-control me-2" type="search" placeholder="new task" aria-label="task" />
          <button className="btn btn-outline-light" type="submit">+</button>
        </form>

        {todos.map((todo, index) => {
          return (
            <div key={index} className='rounded mt-4 p-2 d-flex' style={{ backgroundColor: todo.completed ? "green" : "lightgrey" }}>
              <div className='me-auto'>{todo.task}</div>
              <div>
                <i className={todo.completed ? "bi bi-check-square" : "bi bi-square"} onClick={()=>checkStatus(index)}></i>
                <i className="bi bi-trash" onClick={()=>deletestaus(index)}></i>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Todo;
