/* 
Filename: ComplexCode.js 
Description: This code demonstrates a complex and sophisticated implementation of a social networking platform.
*/

// Importing necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// Initializing the Express app
const app = express();

// Parsing incoming requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Database connection
mongoose.connect('mongodb://localhost/social_network', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to the social_network database');
  })
  .catch((error) => {
    console.error('Failed to connect to the social_network database: ', error);
    process.exit(1);
  });

// User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// User Model
const User = mongoose.model('User', userSchema);

// POST /api/users - User registration
app.post('/api/users', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Creating a new user
    const user = new User({ name, email, password: hashedPassword });
    const savedUser = await user.save();

    // Generating a JWT for the user
    const token = jwt.sign({ userId: savedUser._id }, 'secretKey');

    res.json({ token });
  } catch (error) {
    console.error('Failed to register user: ', error);
    res.status(500).json({ error: 'Failed to register user' });
  }
});

// GET /api/users - Fetch all users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json({ users });
  } catch (error) {
    console.error('Failed to fetch users: ', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Middleware to authenticate requests
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const payload = jwt.verify(token, 'secretKey');
    req.userId = payload.userId;
    next();
  } catch (error) {
    console.error('Failed to authenticate user: ', error);
    res.status(401).json({ error: 'Failed to authenticate user' });
  }
};

// GET /api/posts - Fetch all posts
app.get('/api/posts', authMiddleware, async (req, res) => {
  try {
    // Fetch posts from the database
    const posts = await Post.find().populate('author', '-password');
    res.json({ posts });
  } catch (error) {
    console.error('Failed to fetch posts: ', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// ... continue writing more lines of code in a sophisticated manner.

// Start the server on port 3000
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});