const express = require('express')
const path = require('path');
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const { PayloadMaker } = require('./components/PayloadMaker')
const app = express()
const PORT = 5000
const _api = "https://kpqitanvcb.execute-api.ap-south-1.amazonaws.com/api/v1/"
const headers = { "Content-Type": "application/json" }
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('static'))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug')

app.get('/',(req,res) =>{
    res.status(200)
    res.render('index-new')
    // res.sendFile(__dirname+'/templates/index.html')
})

app.get('/fevicon.ico', (req,res) => {
    res.send('')
})

app.get('/:short_url', (req, res) => {
    let short_url = req.params.short_url
    let payload = PayloadMaker({short_url:short_url})
    let url = _api+'url-short-to-long'
    fetch(url, {
        method: 'PUT',
        body: JSON.stringify(payload),
        headers: headers
    })
    .then(resp => resp.json()).then(jsonData => {
        if (!jsonData.long_url){res.send({message: "Invalid short URL"})}
        else {res.redirect(jsonData.long_url)}
    })
})

app.post('/url-shortener', (req,res) =>{
    if (! req.body.long_url.includes('http')){
        res.send({message:'Please enter a valid url.'})
    }
    let payload = PayloadMaker(req.body)
    let url = _api+'url-long-to-short'
    fetch(url, {
        method: "PUT",
        body: JSON.stringify(payload),
        headers: headers
      })
      .then(resp => resp.json())
      .then(json => 
        res.render('index-ext-new', {long_url: json.long_url, short_url: "https://uurl.xyz/"+json.short_url}))
})

app.listen(PORT, () => {
    console.log(`Server playing on the super-sonic port :`,PORT)
})