
let form = document.getElementById('form')

function onSubmit(){
    let username = form.elements[0].value
    let password = form.elements[1].value
    fetch('http://localhost:3000/api/checkUser' ,{
        method: 'POST',
        body: JSON.stringify({
            username: username,
            password: password
        })
    }).then(response => {
        return response.json()
    }).then(resp => {
        console.log(resp)
    })
}