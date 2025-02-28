const screen = {
    userProfile: document.querySelector('.profile-info'),
    renderUser(user){
        this.userProfile.innerHTML = `<img src="${user.avatarUrl}" alt="Foto do perfil do usuário" />
                                        <div class="data">
                                            <h1>${user.name ?? 'Não possui nome cadastrado 😢'}</h1>
                                            <p>${user.bio ?? 'Não possui bio cadastrada 😢'}</p>
                                            <button class="botao-contato"><a href=${user.html_url} target="_blank">contact me</a></button>
                                        </div>`
                                        
            document.querySelector('.profile-info').style.display = 'block';

        let repositoriesItens = ''
        user.repositories.forEach(repo => repositoriesItens += `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>`)

        if(user.repositories.length > 0){
            document.querySelector('.repositories.section').innerHTML = `<h2>Repositórios</h2>
                                                                <ul>${repositoriesItens}</ul>`
        }
    }
}

export { screen }