const socket = io('http://localhost:8080')
const selfUsername = window.localStorage.getItem('username')

class Users{
    constructor(){
        this.setup()
    }

    async setup(){
        const users = await this.fetchUsers()
        const userList = await users.users
        await userList.forEach(user  => {
            this.displayUser(user)
        })
        await this.addListener()
    }

    async fetchUsers(){
     
        const users = await fetch('http://localhost:3000/api/user/get' , {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        
        return users.json()
       
    }

    async displayUser(username){
        if(username === selfUsername) return;
        const userList = document.getElementById('userlist')
        const userDiv = document.createElement('div')
        userDiv.className = 'user'
        userDiv.innerText = username
        userList.appendChild(userDiv)

    }

    async addListener(){
        const users = document.querySelectorAll('.user')
        users.forEach(user => {
            user.addEventListener('click' , (event) => {
                socket.emit('addRoom' , {roomName : user.innerText})
                window.location.href = `/chat/${user.innerText}`
            })
        })  

    
    }
}

new Users()

