const express = require('express')
const path = require('path')

const server = express()
server.use(express.json())

server.use(express.static('public'))

server.set('views',path.join(__dirname, "views"))
server.set('view engine', 'hbs')

server.get('/', (request, response)=>{
    return response.render('index')
})

server.listen(5500, ()=>{
    console.log('App running in http://localhost:5500/')
}) 