const User = require('../modals/userSchema');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');


// const authenticateToken = (req, res, next) => {
//     // Get the token from the request header
//     const token = req.headers.authorization;
  
//     if (!token) {
//       // If the token is not provided, return an unauthorized status
//       return res.status(401).json({ message: 'Unauthorized' });
//     }
  
//     // Verify the token
//     jwt.verify(token, 'adarsh', (err, user) => {
//       if (err) {
//         // If the token verification fails, return an unauthorized status
//         return res.status(401).json({ message: 'Unauthorized' });
//       }
  
//       // If the token is valid, you can access the decoded user information
//       req.user = user;
  
//       // Proceed to the next middleware or route handler
//       next();
//     });
// };

// // Get todos for a specific user
router.get('/:username', async (req, res) => {
    try {
      const {username} = req.params;
      const user = await User.findOne({ username });
      
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      const todos = user.todos;
      res.status(200).json(todos);
    } catch (error) {
      console.error('Error fetching todos:', error);
      res.status(500).json({ message: 'An error occurred' });
    }
  });

// Create a new todo
router.post('/createTodo', async (req, res) => {
    try {
        // const username = req.params;
        const {username,title, description } = req.body;
        console.log(req.body);
        // Find the user by username
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Create a new Todo
        const newTodo = {
            title,
            description,
        };

        // Add the new Todo to the user's todos array
        user.todos.push(newTodo);

        // Save the updated user
        const updatedUser = await user.save();
        console.log(username);
        res.status(201).json(newTodo);
        // console.log(updatedUser);
        // res.status(201).json({ message: 'User created successfully'});
    } catch (error) {
        console.error('Error creating Todo:', error);
        res.status(500).json({ error: 'Failed to create Todo' });
    }
});

// Update a todo by ID
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        const updatedTodo = await Todo.findByIdAndUpdate(id, { title, description }, { new: true });
        if (!updatedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }
        res.json({ message: 'Todo updated successfully', todo: updatedTodo });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
});

// Delete a todo by ID
router.delete('/:username/:todoId', async (req, res) => {
    try {
      const username = req.params.username;
      const todoId = req.params.todoId;
  
      // Find the user by their ID
      const user = await User.findOne({username});
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Find the todo within the user's todos array
      const todoIndex = user.todos.findIndex((todo) => todo._id.toString() === todoId);
  
      if (todoIndex === -1) {
        return res.status(404).json({ message: 'Todo not found' });
      }
  
      // Remove the todo from the user's todos array
      user.todos.splice(todoIndex, 1);
  
      // Save the updated user
      await user.save();
  
      res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (err) {
      console.error('Error deleting todo:', err);
      res.status(500).json({ message: 'An error occurred' });
    }
  });
  

module.exports = router;