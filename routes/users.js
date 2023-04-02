const express = require('express')
const router = express.Router()


const usernames = ['himanshu' , 'sudhanshu']
const passwords = ['sudhanshu' , 'himanshu']

router.post('/check' , (req , res) => {
    console.log('Post request made')
    const username = req.body.username
    const password = req.body.password
    let jsonResponse = {
        userExist: true,
        passwordCorrect: true 
    }
    if(usernames.includes(username)){
        console.log('User Exists')
        let usernameIndex = usernames.indexOf(username)
        console.log(usernameIndex)
        if(passwords.at(usernameIndex) === password){
            console.log('password is correct')
            res.json(jsonResponse)
        }else { 
            console.log('password is incorrect')
            jsonResponse.passwordCorrect = false
            res.json(jsonResponse)
        }
    }else {
        console.log('User Does not exist ')
        jsonResponse.userExist = false
        jsonResponse.passwordCorrect = false
        res.json(jsonResponse)
    }
})

router.post('/create' , (req , res) => {
    let username = req.body.username
    let password = req.body.password
    usernames.push(username)
    passwords.push(password)
    res.json({
        "message": "user created succesfully"
    })

})

router.get('/get' , (req , res) => {
    res.json({"users": usernames})
})

module.exports = router