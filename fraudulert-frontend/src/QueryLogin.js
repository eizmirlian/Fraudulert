const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;

mongoose.connect('mongodb://localhost/FraudulertDB');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.get('/api/data/:username/:password', async (req, res) => {
    try {
      const collection = db.collection('yourCollectionName'); // Replace with your actual collection name
      const { username, password } = req.params;
  
      // Define a query condition to check the specific field
      const query = { ["username"]: username, ["password"]: password };
  
      const data = await collection.find(query).toArray();
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

