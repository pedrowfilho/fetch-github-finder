const screen = {
    userProfile: document.querySelector('.profile-info'),
    renderUser(user){
        this.userProfile.innerHTML = `<img src="${user.avatarUrl}" alt="Foto do perfil do usuário" />
                                        <div class="data">
                                            <h1>${user.name ?? 'Não possui nome cadastrado 😢'}</h1>
                                            <h2>[ ${user.userName ?? 'Não possui nome de usuário cadastrado 😢'} ]</h2>
                                            <p>${user.bio ?? 'Não possui bio cadastrada 😢'}</p>
                                            <div class="profile-statistics">
                                            <p>${user.followers} 🚀</p>
                                                <p>${user.following} 🚶...🚶</p>
                                            </div>
                                            <button class="botao-contato"><a href=${user.htmlUrl} target="_blank">contact me</a></button>
                                        </div>`
                                        
            document.querySelector('.profile-info').style.display = 'block';

        let repositoriesItens = ''
        user.repositories.forEach(repo => repositoriesItens += `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>`)

        if(user.repositories.length > 0){
            document.querySelector('.repositories-section').innerHTML = `<h2>Repositórios</h2>
                                                                <ul>${repositoriesItens}</ul>`
        }
    },
    renderEvents(events) {
        const eventsList = document.getElementById("events-list")
        eventsList.innerHTML = ""
    
        if (events.length === 0) {
            eventsList.innerHTML = "<li><h3>Nenhuma atividade recente.</h3></li>"
            document.querySelector('.events-section').style.display = 'block'
            return
        }
    
        events.forEach(event => {
            const eventItem = document.createElement("li")

            const repoName = event.repo.name
            const eventType = event.type
            let messages = "Sem mensagens registradas."
    
            if (event.payload.commits) {
                for (let i = 0; i < event.payload.commits.length; i++) {
                    messages += event.payload.commits[i].message + "<br>"
                }
            }
            if (eventType === "PushEvent") {
                eventItem.innerHTML = `<strong>${repoName}</strong> - ${messages}`
                messages = `Repositório ${event.repo.name} criado.`
            }
            if(eventType === "CreateEvent"){
                eventItem.innerHTML = `${messages}`
            }
            eventsList.appendChild(eventItem)
        })
        document.querySelector('.events-section').style.display = 'block'
    },
    renderNotFound(){
        this.userProfile.innerHTML = "<h3>Usuário não encontrado 😕</h3>"
        document.querySelector('.profile-info').style.display = 'block'
        document.querySelector('.repositories-section').innerHTML = ''
    }
}

export { screen }