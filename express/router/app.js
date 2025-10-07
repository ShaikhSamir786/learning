const express = require('express');
const app = express();
const port = 3000;

// Route with param
app.get('/api/:id', (req, res) => {
  const resourceId = Number(req.params.id);
  res.send({ message: `You requested resource with ID: ${resourceId}` });
}); // same as /api/123


// Route with query
app.get('/search', (req, res) => {
  const query = req.query.query || 'none';
  res.send({ message: `You searched for: ${query}` });
}); // same as /search?query=term

// invalid route handler
app.use((req, res) => {
  res.status(404).send({ error: 'Not Found' });
});


// Start server
app.listen(port, () => {
  console.log(`✅ Server running at http://localhost:${port}`);
});
