import axios from 'axios';
import React, { useState, useEffect } from 'react'; 
import { Box, Button, Checkbox, Center, ListItem, List, FormControl, Input, Text } from '@chakra-ui/react';
import { Form } from 'react-router-dom';

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
      setNewTodo("");
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
    <Center m={30}>
    <Box boxShadow="lg" w="75%" h="400px" rounded="3em" p="10" bg="white" background='#E0E9BE'>
      <Center>
        <Text fontSize="4xl">List</Text>
      </Center>
        <Form>
          <Center>
            <Input value={newTodo} boxShadow="lg" bg="white" type='text' onChange={e => setNewTodo(e.target.value)}/>
            <Button boxShadow="lg" m={2} className='submit' type='submit' onClick={() => addNewTodo(newTodo)}>Add</Button>
          </Center>
        </Form>
        <Box mr="0.6em">
          <div style={{overflowY: "scroll", height: "40vh"}}>
            <List>
              {todos.map(todo => (
                <ListItem>
                  <Text as={todo.check == true && "s"} m={1} fontSize="xl" key={todo.id}>
                  {todo.check ?
                    <Checkbox m={2.5} type="checkbox" isChecked={todo.check} onChange={() => checkTodo(todo.id, false)}/>
                    : <Checkbox background="white" m={2.5} type="checkbox" isChecked={todo.check} onChange={() => checkTodo(todo.id, true)}/>}
                    {todo.name}
                  <Button size="xs" background="#2a9d8f" m={2} onClick={() => deleteTodo(todo.id)}>X</Button>
                  </Text>
                </ListItem>
              ))}
            </List>
          </div>
          </Box>
        </Box>
      </Center>
  );
}

export default Todolists;
