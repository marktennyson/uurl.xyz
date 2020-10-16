const cryptoJs = require('crypto-js')
const config = require('../config.json')

function PayloadMaker(jsonBody) {
    let api_key = config.api_key_det.api_key
    let api_key_secret = cryptoJs.enc.Utf8.parse(config.api_key_det.api_key_secret)
    let body = cryptoJs.enc.Utf8.parse(JSON.stringify(jsonBody)) 
    let signature = cryptoJs.enc.Hex.stringify(cryptoJs.HmacSHA256(body, api_key_secret))
    let preEncJson = {api_key:api_key, signature:signature, body:JSON.stringify(jsonBody)}
    let encoded_data = Buffer.from(JSON.stringify(preEncJson)).toString('base64')
    return ({encoded_data:encoded_data})
}

module.exports = {PayloadMaker}