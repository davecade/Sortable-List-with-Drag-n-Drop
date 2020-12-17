const App = (() => {

    // -- Cache the DOM
    const listEl = document.querySelector(".my-list")
    const shuffleButton = document.querySelector(".reset")


    const correctGameList = [
        'World Of Warcraft',
        'Final Fantasy 8',
        'Crash Bandicoot',
        'Guild Wars 2',
        'Blade & Soul',
        'Tekken 3',
        'Overwatch',
        'Shadow of Mordor',
        'Heros of the Storm',
        'Dota'
    ]

    let gameListCopy = correctGameList.map(game => {
        return game
    })

    let gameList = shuffle(gameListCopy)

    let dragStartIndex

    const init = () => {
        render();
        listeners();
    }
    
    function dragStart(){
        dragStartIndex = this.closest('li').getAttribute('data-index')
    }

    function dragEnter() {
        this.classList.add('over')
    }
    
    function dragLeave() {
        this.classList.remove('over')
    }

    function swapItems(fromIndex, toIndex) {
        let itemOne = gameList[fromIndex]
        let itemTwo = gameList[toIndex]
        gameList[fromIndex] = itemTwo
        gameList[toIndex] = itemOne
    }

    function dragOver(e) {
        e.preventDefault();
    }
    

    function dragDrop(e){
        e.preventDefault();
        const dragEndIndex = this.getAttribute('data-index')
        swapItems(dragStartIndex, dragEndIndex)
        this.classList.remove('over')
        init();
    }

    // -- Taken from: https://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
    function shuffle(a){
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }

    const listeners = () => {
        const draggableEl = document.querySelectorAll(".draggable");
        const draggableListEl = document.querySelectorAll(".my-list li")

        draggableEl.forEach(draggable => {
            draggable.addEventListener('dragstart', dragStart)
        })

        draggableListEl.forEach( item => {
            item.addEventListener('dragover', dragOver)
            item.addEventListener('drop', dragDrop)
            item.addEventListener('dragenter', dragEnter)
            item.addEventListener('dragleave', dragLeave)
        })

        shuffleButton.addEventListener('click', () => {
            gameList = shuffle(gameListCopy)
            init();
        })
    }

    const checkOrder = (index) => {

        if(gameList[index] === correctGameList[index]) {
            return 'right'
        } else {
            return 'wrong'
        }

    }

    const isCorrect = () => {
        for(let i = 0; i < gameList.length; i++) {
            if(gameList[i] !== correctGameList[i]) {
                return false
            }
        }

        return true
    }

    const render = () => {
        let markup = ''

        gameList.forEach( (game, index) => {
            markup += `
                <li data-index="${index}">
                    <span class="rank">${index+1}</span>
                    <div class="name-container draggable" draggable="true">
                        <p class="name ${checkOrder(index)}">${game}</p>
                    </div>
                </li>
            `
        })

        
        listEl.innerHTML = markup;

        if(isCorrect()) {
            const rankEl = document.querySelectorAll(".rank")
            const gameEl = document.querySelectorAll(".name-container")

            for(let i=0; i< gameList.length; i++ ) {
                rankEl[i].style = "border: 1px solid #ffc400"
                gameEl[i].style = "border: 1px solid #ffc400"
            }
        }
        
    }

    return {
        init
    }

})()

App.init();


