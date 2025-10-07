const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.static(path.join(__dirname, 'public')));


app.use('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
    console.log('Request received');
    
});

// app.get('/', (req, res) => {
//     res.send('home Page from server.js');
//     console.log('Home page requested');
// });

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
