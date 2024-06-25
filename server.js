// server.js
const express = require('express');
const mongoose = require('mongoose');
const moment = require('moment'); // Optional for timestamp formatting

const app = express();
const PORT = process.env.PORT || 3001;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/socialNetworkDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Import Models
const User = require('./models/User');
const Thought = require('./models/Thought');
const Reaction = require('./models/Reaction');

// Routes (user, thought, reaction, friend)
const userRoutes = require('./routes/userRoutes');
const thoughtRoutes = require('./routes/thoughtRoutes');
const reactionRoutes = require('./routes/reactionRoutes');
const friendRoutes = require('./routes/friendRoutes'); // Friend routes operate on the User model

app.use('/api/users', userRoutes(User)); // Pass User model here
app.use('/api/thoughts', thoughtRoutes(Thought));
app.use('/api/reactions', reactionRoutes(Reaction, Thought)); 
app.use('/api/users', friendRoutes(User));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
