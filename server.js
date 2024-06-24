const express = require('express');
const bodyParser = require('body-parser');
const { HTMLToJSON } = require('html-to-json-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/parse', async (req, res) => {
  let htmlContent = req.body.html;
  
  // Remove all whitespace between tags, preserve space in content
  htmlContent = htmlContent.replace(/>\s+</g, '><').trim();
  // Remove leading/trailing whitespace from tag contents
  htmlContent = htmlContent.replace(/\s+>/g, '>').replace(/<\s+/g, '<');
console.log(htmlContent)
  try {
    const result = await HTMLToJSON(htmlContent, false);
    res.send(result);
  } catch (error) {
    console.error('Error:', error);
    res.status(400).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
