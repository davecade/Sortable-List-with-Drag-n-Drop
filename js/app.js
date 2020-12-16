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

    let dragStartIndex

    const init = () => {
        render();
        listeners();
    }
    
    function dragStart(){
        dragStartIndex = +this.closest('li').getAttribute('data-index')
        console.log(dragStartIndex)
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
        console.log(dragEndIndex)
        swapItems(dragStartIndex, dragEndIndex)
        this.classList.remove('over')
        init();
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
    }

    

    const render = () => {
        let markup = ''

        console.log(gameList)

        gameList.forEach( (game, index) => {
            markup += `
                <li data-index="${index}">
                    <span class="rank">${index+1}</span>
                    <div class="name-container draggable" draggable="true">
                        <p class="name">${game}</p>
                        <i class="fas fa-grip-lines"></i>
                    </div>
                </li>
            `
        })
        
        listEl.innerHTML = markup;
    }

    return {
        init
    }

})()

App.init();


