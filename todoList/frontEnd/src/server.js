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

server.get('/addtask', (request, response)=>{
    return response.render('addtask')
})

server.listen(8080, ()=>{
    console.log('App running in http://localhost:8080/')
}) 