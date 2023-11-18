const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;
const cors = require('cors'); // Import the cors module

// Enable CORS for all routes
app.use(cors());

mongoose.connect('mongodb://localhost/FraudulertDB');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(bodyParser.json());
app.get('/api/data/:username/:password', async (req, res) => {
    try {
      console.log("connected");
      const collection = db.collection('Users'); // Replace with your actual collection name
      const { username, password } = req.params;
  
      // Define a query condition to check the specific field
      console.log(username + " " + password);
      const query = { ["username"]: username, ["password"]: password };
  
      const data = await collection.find(query).toArray();
      if (data.length > 0) {
        res.json({ success: true, message: 'Login successful' });
      } else {
        res.json({ success: false, message: 'Login unsuccessful' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
});
  
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
