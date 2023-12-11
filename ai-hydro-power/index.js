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

app.use('/',PageRoutes)

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`))