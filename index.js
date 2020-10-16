const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const { PayloadMaker } = require('./components/PayloadMaker')
// const ejs = require('ejs')
const app = express()
const PORT = 5000
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('static'))

app.get('/',(req,res) =>{
    res.status(200)
    // let data = PayloadMaker({name:"Aniket_Sarkar"})
    // res.send({message:"This is the index page!", data:data})
    // res.render(__dirname+'/templates/index.ejs')
    res.sendFile(__dirname+'/templates/index.html')
})

app.get('/:id', (req, res) => {
    let id = req.params.id
    res .send({id:id})
})

app.post('/url-shortener', (req,res) =>{
    let reqJson = req.body
    const firstname = reqJson.firstname
    const lastname = reqJson.lastname
    res.send({fullName: firstname.concat(" ", lastname)})
})

app.listen(PORT, () => {
    console.log(`Server playing on the super-sonic port :`,PORT)
})