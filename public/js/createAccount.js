
function onSubmit(){
    console.log('function called')
    const form = document.getElementById('form')
    const username = form.elements[0].value
    const password = form.elements[1].value
    
    const data = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "username": username,
            "password": password
        })
    }

    fetch('http://localhost:3000/api/user/create' , data)
    .then(response => { return response.json()} )
    .then(response => {
        if(response.created === true || response.userExist === false){
            window.localStorage.setItem('username' , username)
            window.localStorage.setItem('password' , password)
            window.localStorage.setItem('logged-in' , true)
            window.location.replace('/home')
        }else if(response.userExist){
            console.log('huh')
            form.elements[0].value = ''
            form.elements[1].value = ''
            form.elements[0].placeholder = 'Name already taken'
            // console.log()
        }
    })
}

document.getElementById('form').addEventListener('submit' , (event) => {
    event.preventDefault()
    onSubmit()
})

function redirectToLoginPage(){
    window.location.replace('/')
}