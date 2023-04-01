
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

    fetch('http://localhost:3000/api/user/check' , data)
    .then(response => { return response.json()} )
    .then(resp => {
        console.log(resp)
        if(resp.userExist === false){
            console.log('Account do not exist')
            form.elements[0].value = ""
            form.elements[1].value = ""
            form.elements[0].placeholder = "User do not exist"
        }else if(resp.passwordCorrect === false) {
            console.log('Password is not Correct')
            form.elements[0].value = ""
            form.elements[0].placeholder = "Username"
            form.elements[1].value = ""
            form.elements[1].placeholder = "Password incorrect"
        }else if(resp.userExist && resp.passwordCorrect === true){
            console.log('Username and password is correct')
        }
    })
}

document.getElementById('form').addEventListener('submit' , (event) => {
    event.preventDefault()
    onSubmit()
})

function redirectToCreateAccount(){
    window.location.replace('/createAccount')
}