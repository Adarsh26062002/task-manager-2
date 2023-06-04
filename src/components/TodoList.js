import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TodoList = ({username}) => {
  // const initialArray = localStorage.getItem("todos")?JSON.parse(localStorage.getItem("todos")):[];
  const navigate = useNavigate()
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [user, setUser] = useState(username);

  useEffect(() => {
    localStorage.setItem('user', user);
    const storedUsername = localStorage.getItem('user');
    if (storedUsername) {
      setUser(storedUsername);
      username = storedUsername;
    }
  }, [user]);

  console.log(user);
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(`http://localhost:5000/${user}`);
        console.log(response);
        if (response.ok) {
          const data = await response.json();
          setTodos(data);
        } else {
          console.log('Failed to fetch todos');
        }
      } catch (error) {
        console.log('Error:', error);
      }
    };
  
    fetchTodos();
  }, [user]);

  // console.log(username);
  const handleTitleChange = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    e.preventDefault();
    setDescription(e.target.value);
  };

  const handleLogout = () => {
    // Clear the token from local storage
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    // Redirect or perform any other actions after logout
    // For example, navigate to the sign-in page
    navigate('/signin');
  };

  const handleAddTodo = async (e) => {
    e.preventDefault();
    if (title.trim() !== '' && description.trim() !== ''){
      const newTodo = {
        username,
        title,
        description,
      };

      try {
        const response = await fetch('http://localhost:5000/createTodo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newTodo),
        });
        console.log(response);
        if (response.ok) {
          const createdTodo = await response.json();
          console.log(createdTodo);
          setTodos([...todos, createdTodo]);
          setTitle('');
          setDescription('');
          console.log("Todo created successfully");
        } else {
          console.log('Failed to create todo');
        }
      } catch (error) {
        console.log('Error:', error);
      }
    }
  };

  const handleDeleteTodo = (id) => {
    console.log(todos);
    fetch(`http://localhost:5000/${username}/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Optional: handle the response data
        // Call a function to update the todo list in the frontend
      })
      .catch((error) => {
        console.error('Error deleting todo:', error);
      });
  };

  return (
    <div className="container">
      <h2 className="mt-4">Todo List</h2>
      <button className="btn btn-primary mb-3" onClick={handleLogout}>
        Logout
      </button>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Title"
          value={title}
          onChange={handleTitleChange}
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Description"
          value={description}
          onChange={handleDescriptionChange}
        />
      </div>
      <button className="btn btn-primary mb-3" onClick={handleAddTodo}>
        Add Todo
      </button>
      <ul className="list-group">
        {todos.map((todo) => (
          <li key={todo.id} className="list-group-item">
            <h3>{todo.title}</h3>
            <p>{todo.description}</p>
            <button
              className="btn btn-danger"
              onClick={() => handleDeleteTodo(todo._id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
