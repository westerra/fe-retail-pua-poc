const express = require('express');
const app = express();

// Serve all static files from the 'dist' directory
app.use(express.static('dist'));

// Redirect all requests to the index.html file
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/apps/retail-usa/src/index.html');
});

// Start the server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
