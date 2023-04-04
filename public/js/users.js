
let displayArea = document.getElementById('displayArea')

function fetchUsers(){
    // console.log('Hello friend')
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
        addListeners()
    })
}

fetchUsers()


function displayUser(username){
        // console.log(username)
        let userDiv = document.createElement('div')
        userDiv.className = 'userdiv'
        userDiv.innerText = username
        displayArea.appendChild(userDiv)
}

function addListeners (){
    const userDivs = document.querySelectorAll('.userdiv')
    // console.log(userDivs)
    userDivs.forEach(userDiv => {
        userDiv.addEventListener('click' , () => {
            let classes = userDiv.classList
            if(classes.contains('friend')){
                console.log('Removing friend')
                userDiv.classList.remove('friend')
                friend(userDiv.innerText , false)

            }else if(!classes.contains('friend')){
                userDiv.classList.add('friend')
                friend(userDiv.innerText , true)
                
            }
        })
    })

}

function friend(friendUsername , add){
    if(friendUsername === window.localStorage.getItem('username')) return;
    fetch('http://localhost:3000/api/user/friend' , {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            selfUsername: window.localStorage.getItem('username'),
            friendName: friendUsername,
            add: (add === true)? true:false
        })
    })
}