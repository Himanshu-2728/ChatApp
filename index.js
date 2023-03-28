const express = require('express')
const path = require('path')
const http = require('http')
const  { Server } = require('socket.io')
const users = require('./data/users.json')

const app = express()
const server = http.createServer(app)
const socket = new Server(server)

app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))

// Socket

socket.on('connection' , socket => {
    console.log('A new user connected with socket id ' + socket.id)
})

// Express

app.get('/' , (req , res) => {
    res.sendFile(path.join(__dirname , 'public' , 'loginPage.html'))
})

app.post('/api/checkUser' , (req , res) => {
    console.log(req.body)
})

server.listen(3000)