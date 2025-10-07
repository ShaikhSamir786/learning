const express = require('express');
const app = express();
const { query, validationResult } = require('express-validator');

app.get('/hello', 
  query('person').notEmpty().escape(), // Validate that `person` is not empty and escape it
  async (req, res) => {
    const result = validationResult(req); // Get the validation result
    
    if (!result.isEmpty()) { // If validation fails
      // Return the validation errors in JSON format
      return res.status(400).json({ errors: result.array() });
    }

    // If validation passes, send the greeting
    return res.send(`Hello, ${req.query.person}!`);
  }
);

app.listen(3000);