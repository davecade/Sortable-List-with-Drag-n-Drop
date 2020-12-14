const App = (() => {

    // -- Cache the DOM
    const listEl = document.querySelector(".my-list")

    const gameList = [
        'World Of Warcraft',
        'Overwatch',
        'Final Fantasy 8',
        'Dota',
        'Crash Bandicoot',
        'Guild Wars 2',
        'Shadow of Mordor',
        'Heros of the Storm',
        'Blade & Soul',
        'Tekken 3'
    ]

    const init = () => {
        render();
        listeners();
    }

    const listeners = () => {

    }

    const render = () => {
        let markup

        gameList.forEach( (game, index) => {

            markup += `
                <li>
                    <span class="rank">${index+1}</span>
                    <div class="name-container">
                        <p class="name">${game}</p>
                        <i class="fas fa-grip-lines"></i>
                    </div>
                </li>
            `

        })
        
        listEl.innerHTML = markup
    }

    return {
        init
    }

})()

App.init();


