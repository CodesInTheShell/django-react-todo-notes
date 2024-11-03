import React, { useState, useEffect } from 'react';
import api from "../api";

function Todo() {
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await api.get("/api/todos/");
        setTodos(res.data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchTodos();
  }, []); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/api/todos/", JSON.stringify({ title: title }), {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('New todo response:', res);

      // Refresh the todo list after creating a new one
      setTodos([...todos, res.data]); 
    } catch (error) {
      alert(error);
    } finally {
      setTitle('');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter todo title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button type="submit">Create</button>
      </form>

      {/* Display the list of todos */}
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.title} 
            {/* Conditionally render llm_response if it exists */}
            {todo.llm_response && <p>LLM: {todo.llm_response}</p>} 
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;



// import React, { useState } from 'react';
// import api from "../api";

// function Todo() {
//   const [title, setTitle] = useState('');

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log('New todo:', title);

//     try {
//         const res = await api.post("/api/todos/", JSON.stringify({title: title}), {
//             headers: {
//               'Content-Type': 'application/json'
//             }
//           });
//         console.log('New todo response:', res);
    
//     } catch (error) {
//         alert(error)
//     } finally {
//         console.log('Finally!');
//     }

//     setTitle('');


//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Enter todo title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//         />
//         <button type="submit">Create</button>
//       </form>
//     </div>
//   );
// }

// export default Todo;
