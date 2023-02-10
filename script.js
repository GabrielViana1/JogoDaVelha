//aqui selecionei todos os quadrados (span) do jogo 
const game = document.querySelectorAll('.game span')
let vBoard = []
let turnPlayer = ''

function updateTitle () {
    //A varialvel turnPlayer é uma string vazia
    //O player input está pegando o turnPlayer que é uma string vazia
    //continua na 3ª linha da função initializeGame
    const playerInput = document.getElementById(turnPlayer)
    /*aqui o span que tem o ID "turnPlayer" vai ter o texto que for pego pelo
    playerInput*/
    document.getElementById('turnPlayer').innerText = playerInput.value
}

//função criada para preparar o tabuleiro, zerando todos valores antigos
function initializeGame () {
    vBoard = [['','',''], ['','',''],['','','']]
    //aqui eu defino o turnPlayer como 'player1' que é o ID do input player1
    //então de uma string vazia ele passa a valer a string 'player1 que é o ID do input no Html
    turnPlayer = 'player1'
    //aqui deixamos o span vazio novamente para um novo jogo
    document.querySelector('h2').innerHTML = 'Vez de: <span id="turnPlayer"></span>'
    updateTitle()
    //aqui removemos de cada elemento (span) o texto e a cor de vitoria, para iniciar um novo jogo
    game.forEach(function (element) {
        element.classList.remove('win')
        element.innerText = ''
        element.classList.add('cursorPointer')
        element.addEventListener('click', handleBoardClick)
    })
}

function getWinRegions() {
    const winRegions = []
    //aqui verificamos se algumas regiões estão preenchidas e se são iguais
    if (vBoard[0][0] && vBoard[0][0] === vBoard[0][1] && vBoard[0][0] === vBoard[0][2])
        //aqui puxamos essas regiões para o array
        winRegions.push("0.0", "0.1", "0.2")
    if (vBoard[1][0] && vBoard[1][0] === vBoard[1][1] && vBoard[1][0] === vBoard[1][2])
        winRegions.push("1.0", "1.1", "1.2")
    if (vBoard[2][0] && vBoard[2][0] === vBoard[2][1] && vBoard[2][0] === vBoard[2][2])
        winRegions.push("2.0", "2.1", "2.2")
    if (vBoard[0][0] && vBoard[0][0] === vBoard[1][0] && vBoard[0][0] === vBoard[2][0])
        winRegions.push("0.0", "1.0", "2.0")
    if (vBoard[0][1] && vBoard[0][1] === vBoard[1][1] && vBoard[0][1] === vBoard[2][1])
        winRegions.push("0.1", "1.1", "2.1")
    if (vBoard[0][2] && vBoard[0][2] === vBoard[1][2] && vBoard[0][2] === vBoard[2][2])
        winRegions.push("0.2", "1.2", "2.2")
    if (vBoard[0][0] && vBoard[0][0] === vBoard[1][1] && vBoard[0][0] === vBoard[2][2])
        winRegions.push("0.0", "1.1", "2.2")
    if (vBoard[0][2] && vBoard[0][2] === vBoard[1][1] && vBoard[0][2] === vBoard[2][0])
        winRegions.push("0.2", "1.1", "2.0")
    //após puxar as regiões para o array retornamos o array para a função, que agora equivale as regiões puxadas
    return winRegions                               
}

function disabled(element) {
    element.classList.remove('cursorPointer')
    element.removeEventListener('click', handleBoardClick)
}

function handleWin(regions) {
    regions.forEach(function (region) {
        document.querySelector('[data-region="' + region + '"]').classList.add('win')
    })
    const playerWin = document.getElementById(turnPlayer).value
    document.querySelector('h2').innerHTML = playerWin + ' Ganhou!'
}

function handleBoardClick(ev) {
    //aqui definimos o span, como a região clicada ou span clicado
    const span = ev.currentTarget
    //o span.dataset.region retornara o valor do data-region no HTML EX: 0.0
    const region = span.dataset.region
    /*Na função explit vamos dividir o valor do region (o.o) em um array com 
    duas strings, colocamos o (.) como separção que criara um array assim: ["0", "0"] */ 
    const rowColumn = region.split('.')
    //O (ROW) será equivalente ao primeiro numero da array (rowColumn)
    const row = rowColumn[0]
    //O (column) será equivalente ao segundo numero da array (rowColumn)
    const column = rowColumn[1]
    if (turnPlayer === 'player1') {
        span.innerText = 'X'
        span.style.color = '#0000FF'
        //Assim adicionomos na posição exata de linha e coluna o (X) ou (O)
         vBoard[row][column] = 'X'
    } else {
        span.style.color = '#FF0000'
        span.innerText = 'O'
        vBoard[row][column] = 'O'
    }
    disabled(span)
    console.clear()
    console.table(vBoard)
    //essa variavel é responsavel por receber da função, se ganhou ou não 
    const winRegions = getWinRegions()

    //aqui verificamos se o array (winRegions) esta vazio ou não
    if (winRegions.length > 0) {
        handleWin(winRegions)
        game.forEach(function (span) {
            span.classList.remove('cursorPointer')
            span.removeEventListener('click', handleBoardClick)
        })
    }
    /*aqui utilizamos o metodo (flat) que faz um array bidimensional virar um array unimensional
    e depois verificamos se nesse array inclui algum espaço vazio, se incluir mudamos a vez para outro
    jogador*/ 
    else if (vBoard.flat().includes('')) {
        //se turnPlayer for igual a (player1) ele atualiza para (player2) se não ele atualiza para (player1)
        turnPlayer = turnPlayer === 'player1' ? 'player2' : 'player1'
        updateTitle() 
    } else {
         document.querySelector('h2').innerHTML = "Deu velha!"
    }

}

//aqui aciona o botão (play) para começar um novo jogo
document.getElementById('play').addEventListener('click', initializeGame)

const player1 = document.getElementById('player1')
const player2 = document.getElementById('player2')
const changeTheme = document.querySelector('main')
const theme = document.querySelector(':root')


//Escolher Tema
document.getElementById('changeTheme').addEventListener('click', function () {
    if(changeTheme.dataset.theme === 'dark') {
        theme.style.setProperty("--bg-color", "#e9e9e9")
        theme.style.setProperty("--font-color", "#1C1C1C")
        player1.style.color = '#e9e9e9'
        player1.style.backgroundColor = '#1c1c1c'
        player2.style.color = '#e9e9e9'
        player2.style.backgroundColor = '#1c1c1c'
        changeTheme.dataset.theme = "light"
    } else {
        theme.style.setProperty("--bg-color", "#1c1c1c")
        theme.style.setProperty("--font-color", "#d3d3d3")
        player1.style.color = '#1C1C1C'
        player1.style.backgroundColor = '#d3d3d3'
        player2.style.color = '#1C1C1C'
        player2.style.backgroundColor = '#d3d3d3'
        changeTheme.dataset.theme = "dark"
    }
})