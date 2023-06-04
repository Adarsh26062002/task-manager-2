const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../modals/userSchema');

const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/signin', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate and sign the JWT token
    const token = jwt.sign({ userId: user._id }, 'adarsh', { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (err) {
    console.error('Error signing in:', err);
    res.status(500).json({ message: 'An error occurred' });
  }
});

module.exports = router;
