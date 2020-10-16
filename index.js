const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const { PayloadMaker } = require('./components/PayloadMaker')
const app = express()
const PORT = 5000
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/',(req,res) =>{
    res.status(200)
    // let data = PayloadMaker({name:"Aniket_Sarkar"})
    // res.send({message:"This is the index page!", data:data})
    res.sendFile(__dirname+'/templates/index.html')
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