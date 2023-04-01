const express = require('express')
const http = require('http')
const path = require('path')
const { Server } = require('socket.io')
const usersRouter = require('./routes/users')

const app = express()
const server = http.createServer(app)
const io = new Server()



app.use(express.json())
app.use(express.static('public'))
app.use('/api/user' , usersRouter)

app.get('/' , (req , res) =>{
    console.log("Home page")
    res.sendFile(path.join(__dirname , 'public' , 'html' , 'loginPage.html'))
})

app.get('/createAccount' , (req , res) => {
    res.sendFile(path.join(__dirname , 'public' , 'html' , 'createAccount.html'))
})

app.get('/createAccount' , (req , res) => {
    res.sendFile(path.join(__dirname , 'public' , 'html' , 'createAccount.html'))
})

server.listen(3000)