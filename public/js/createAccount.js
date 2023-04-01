
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
    .then(response => {console.log(response)})
}

document.getElementById('form').addEventListener('submit' , (event) => {
    event.preventDefault()
    onSubmit()
})

function redirectToLoginPage(){
    window.location.replace('/')
}