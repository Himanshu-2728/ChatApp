
let displayArea = document.getElementById('displayArea')

function fetchUsers(){
    let url = 'http://localhost:3000/api/user/get'
    data = {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    }
    fetch(url , data)
    .then(response => { return response.json() })
    .then(response => {
        for(const user of response.users){
            displayUser(user)
        }
    })
}

fetchUsers()


function displayUser(username){
        console.log(username)
        let userDiv = document.createElement('div')
        userDiv.className = 'userdiv'
        userDiv.innerText = username
        displayArea.appendChild(userDiv)
}

