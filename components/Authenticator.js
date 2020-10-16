const fs = require('fs')
const crypto = require('crypto')
const config = require('./../config.json')

function Authenticator(jsonBody) {
    let api_key = config.api_key_det.api_key
    let api_key_secret = config.api_key_det.api_key_secret
    let body = JSON.stringify(jsonBody)
    let signature = crypto.createHmac('sha1', api_key_secret).update(body).digest('hex')
    let preEncJson = {api_key:api_key, signature:signature, body:jsonBody}
    let encoded_data = Buffer.from(JSON.stringify(preEncJson)).toString('base64')
    return ({encoded_data:encoded_data})
}

module.exports = {Authenticator}