import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Input from './Components/Input';

function Todolists() {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newTodo, setNewTodo] = useState("");
    
    const token = localStorage.getItem('token');

    async function fetchTodos() {
      setLoading(false);
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/todos', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = response.data;
        
        if(data.message === "succesful") {
          setTodos(data.todos);
        } else {
          console.error("Error fetching todos:", data.message);
        }
      } catch (error) {
        console.error("Error fetching todos:", error);
      }   
    }

  useEffect(() => {
    fetchTodos();
  }, []);

  function checkTodo(todoId, value) {
    async function updateTodo() {
        try {
            const patchResponse = await axios.patch(`http://127.0.0.1:8000/api/todos/${todoId}`, {
              'check': value
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            fetchTodos();
        } catch (error) {
            console.error('Error Posting data:', error);
        }
    }
    updateTodo();
  }

  async function addNewTodo(value) {
    try {
      const addNewInput = await axios.post(`http://127.0.0.1:8000/api/todos`, {
        'name': value,
        'check': 0
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      fetchTodos();
    } catch(error) {
      console.log('Error Adding new Input', error);
    }
    fetchTodos();
  }

    async function deleteTodo(todoId) {
      try {
        const response = await axios.delete(`http://127.0.0.1:8000/api/todos/${todoId}`, {
            headers: {
                'Authorization': `Bearer ${token}` 
            }
        });
        fetchTodos();
      } catch(error) {
        console.log('Error by deleting todo', error);
      }
      fetchTodos();
    }

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Todos</h1>
        <form>
          <input type='text' onChange={e => setNewTodo(e.target.value)}/>
          <button className='submit' type='submit' onClick={() => addNewTodo(newTodo)}>Add</button>
        </form>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}><button onClick={() => deleteTodo(todo.id)}>X</button> 
            {todo.name} {todo.check ? 
              <input type="checkbox" checked={todo.check} onChange={() => checkTodo(todo.id, false)}/>
              : <input type="checkbox" checked={todo.check} onChange={() => checkTodo(todo.id, true)}/>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todolists;
