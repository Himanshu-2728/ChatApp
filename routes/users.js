const express = require('express')
const router = express.Router()

const users = require('../database/users')


router.post('/check' , (req , res) => {
    console.log('Post request made')
    const username = req.body.username
    const password = req.body.password
    let jsonResponse = {
        userExist: true,
        passwordCorrect: true 
    }
    findUser(username , password)
    .then(users => {
        if(users.length === 0){
            console.log('Sending jsons')
            jsonResponse.userExist = false
            jsonResponse.passwordCorrect = false
            res.json(jsonResponse)
        }else if(users[0].password !== password) {
            console.log('Triggered')
            jsonResponse.userExist = true
            jsonResponse.passwordCorrect = false
            res.json(jsonResponse)
        }else if(users[0].password === password){
            res.json(jsonResponse)
        }

    })

})

const date = new Date
router.post('/create' , (req , res) => {
    console.log("Create request made")
    let username = req.body.username
    let password = req.body.password
    let createdAt = date.getDate()
    users.find({username: username})
    .then(users => {
        if(users.length === 0){
            console.log('User Added succesfully')
            addUser(username , password , createdAt , [])
            res.json({userExist: false , created: true})

        }else {
            console.log('Name already taken')
            res.json({userExist: true, created: false})
        }
    })
})

router.get('/get' , (req , res) => {
    console.log('get request made')
    let usernames = []
    getAllUsers()
    .then(users => {
        users.forEach(user => {
            usernames.push(user.username)
        })
        res.json({
            users: usernames
        })
    })
})

router.post('/friend' , async(req , res) => {
    // console.log(req.body)
    const selfUser = await users.find({username: req.body.selfUsername})
    const friendUser = await users.find({username: req.body.friendName})
    const friends = selfUser[0].friendList
    if(req.body.add){
        friends.push(friendUser[0])
        await users.updateOne({username: selfUser[0].username} , {$set: {friendList: friends}})
        await selfUser[0].save()
        console.log(selfUser)

    }else if(!req.body.add){
        friends.splice(friends.indexOf(friendUser[0]) , 1)
        await users.updateOne({username: selfUser[0].username} , {$set: {friendList: friends}})
        console.log(selfUser[0])
    }
})

// Util functions-------------------------------------

async function addUser(username , password , createdAt , friendList){
    const user = await users.create({
        username: username,
        password: password,
        createdAt: createdAt,
        friendList: friendList
    })
    await user.save()
    console.log(user)
}

async function findUser(username ){
    const user = await users.find({username: username})
    if(user.length > 1){
        await users.deleteOne({username: username})
    }
    return user
}

async function getAllUsers(){
    return await users.find()
}

module.exports = router