
const express = require('express')
const app = express()
const port = 5050
const path = require('path')

app.use(express.static('dist'));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/serviceWorker.js', (req, res) => { res.sendFile(path.join(__dirname, 'serviceWorker.js')); });

app.get('/second', (req, res) => {
  res.send(`
    <html>
      <body>
        I am second page
      </body>
    </html>
  `)
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})