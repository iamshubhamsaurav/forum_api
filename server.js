const express = require('express');
const dotenv = require('dotenv');

dotenv.config({ path: './config/config.env' });

const app = express();

app.get('/', (req, res) => {
  res.status(200).json({ success: true });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log('Listening to server on port ' + PORT));
