const express = require("express")

const app = express()

app.use(express.json());
app.use(express.static('public'))
app.use(express.urlencoded({
  extended: true
}))
app.set('view engine', 'ejs')

const PORT = 8000

// routes
const PageRoutes = require('./routes/pageRoutes')

app.post('/dummy', (req, res) => {
  // Simulating the response with image paths in JSON format
  console.log(res.file)
  const imagePaths = {
    waterBody: 'generated/0.png',
    waterTerrain: 'generated/1.png',
    waterDensity: 'generated/2.png'
  };

  res.json(imagePaths);
});

app.get('/demo',(req,res)=>{
  res.render('demo')
})

app.use('/',PageRoutes)

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`))