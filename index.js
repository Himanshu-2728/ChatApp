const express = require('express')
const http = require('http')
const path = require('path')
const { Server } = require('socket.io')
const usersRouter = require('./routes/users')

const app = express()
const server = http.createServer(app)
const io = new Server({
    cors: {
        origin: ['http://localhost:3000']
    }
})

io.on('connection' , (socket) => {
    console.log('A socket connected with socket id ' + socket.id)
    socket.on('addRoom' , (object) => {     
        socket.rooms.add(object.roomName)
        console.log('Room added')
    })
})

app.set('view engine' , 'ejs')
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

app.get('/home' , (req , res) => {
    res.sendFile(path.join(__dirname , 'public' , 'html' , 'homePage.html'))
})

app.get('/users' , (req , res) => {
    res.sendFile(path.join(__dirname , 'public' , 'html' , 'users.html'))
})

app.get('/chat' , (req , res) => {
    res.sendFile(path.join(__dirname , 'public' , 'html' , 'chat.html'))
})

app.get('/chat/:username' , (req , res) => {
    res.render('chat' , {username : req.params.username})
})

server.listen(3000)
io.listen(8080)