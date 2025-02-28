import { getUser } from '/src/js/services/user.js'
import { getRepositories } from '/src/js/services/repositories.js'

import { user } from '/src/js/objects/user.js'
import { screen } from '/src/js/objects/screen.js'

document.getElementById('btn-search').addEventListener('click', (event) => {
    event.preventDefault();
    const userName = document.getElementById('input-search').value
    if(userName === '') 
        return alert('Digite um nome de usuário válido')
    else{
        getUserData(userName)
    }
})

document.getElementById('input-search').addEventListener('keyup', (event) => {
    const userName = event.target.value
    const key = event.which || event.keyCode
    if(key === 13){
        getUserData(userName)
    }
})

async function getUserProfile(userName){
    const userResponse = await getUser(userName)
    user.setInfo(userResponse)
    console.log(user)

    screen.renderUser(user)
}

async function getUserData(userName){
    const userResponse = await getUser(userName)
    const repositoriesResponse = await getRepositories(userName)

    user.setInfo(userResponse)
    user.setRepositories(repositoriesResponse)

    console.log(user)

    screen.renderUser(user)
}
