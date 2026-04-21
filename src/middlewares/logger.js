"use strict";
/* -------------------------------------------------------
    EXPRESS - Personnel API
------------------------------------------------------- */
//logger middleware

const morgan=require('morgan')
const customLog = 'TIME=":date[iso]" - URL=":url" - Method=":method" - IP =":remote-addr" - Ref=":referrer" - Status=":status" - Sign=":user-agent" - (:response-time[digits] ms)'

const fs = require('node:fs')

const now = new Date()
const today = now.toISOString().split('T')[0]


module.exports = morgan(customLog,{
   stream:fs.createWriteStream(`./logs/${today}.log`,{flags:'a+'})
 })