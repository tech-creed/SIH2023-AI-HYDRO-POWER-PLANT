const express = require("express")
const app = express()

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(express.urlencoded({
  extended: true
}))
app.set('view engine', 'ejs')

const PORT = 8000

app.get("/",(req,res)=>{
    res.send('Home Page')
})

app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`))