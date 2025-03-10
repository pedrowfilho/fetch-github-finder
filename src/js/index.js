import { getUser } from './services/user.js'
import { getRepositories } from './services/repositories.js'
import { getEvents } from './services/events.js'

import { user } from './objects/user.js'
import { screen } from './objects/screen.js'

document.getElementById('btn-search').addEventListener('click', (event) => {
    event.preventDefault()
    const userName = document.getElementById('input-search').value
    if(validateEmptyInput(userName)) return
    getUserData(userName)
})

document.getElementById('input-search').addEventListener('keydown', (event) => {
    const userName = event.target.value
    const key = event.which || event.keyCode
    if(key === 13){
        event.preventDefault()
        if(validateEmptyInput(userName)) return
        getUserData(userName)
    }
})

function validateEmptyInput(userName){
    if(userName === ''){
        alert('Digite um nome de usuário válido')
        return true
    }
}

async function getUserData(userName){
    const userResponse = await getUser(userName)

    if(userResponse.message === 'Not Found'){
        screen.renderNotFound()
        return
    }

    const repositoriesResponse = await getRepositories(userName)
    const eventsResponse = await getEvents(userName)

    user.setInfo(userResponse)
    user.setRepositories(repositoriesResponse)
    user.setEvents(eventsResponse)
    
    screen.renderUser(user)
    screen.renderEvents(user.events)
}