const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const app = express()
const PORT = 5000
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/index',(req,res) =>{
    res.status(200)
    res.send({message:"This is the index page!"})
})

app.post('/name-joiner', (req,res) =>{
    let reqJson = req.body
    const firstname = reqJson.firstname
    const lastname = reqJson.lastname
    res.send({fullName: firstname.concat(" ", lastname)})
})

app.listen(PORT, () => {
    console.log(`Server playing on the super-sonic port :`,PORT)
})