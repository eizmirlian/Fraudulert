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

app.get('api/gpt', async (req, res) => {
  try {
    console.log("connected");
    const { transaction , causes } = req.params;
    const api_key = "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";
    const openAIResponse = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: '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',
      },
      body: JSON.stringify({
        prompt: "When running a fraudulent transaction detector on this transaction: " + transaction + ", the detector displayed that the transaction was most likely fraudulent" + "for the following reasons: " + causes + "Why would those causes lead to a detector flagging this transaction as fraudulent? (Keep explanations to two sentences per category and don't use the acronym names, use real names)",
        max_tokens: 100,
      }),
    });
    const openAIData = await openAIResponse.json();
    const result = openAIData.choices[0].text.trim(); 
    res.json({ result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error'});
  }
});



  
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
