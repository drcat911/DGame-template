// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ Add your code here ↓↓↓↓↓↓↓↓↓↓↓↓↓↓

// Call Contract
async function PlayboardView() {
    return await contractInteraction.Call(GAME_CONTRACT_ABI_INTERFACE_JSON, GAME_CONTRACT_ADDRESS, 'PlayboardView()')
}

async function Click(x, y, move) {
    return await contractInteraction.Send(GAME_CONTRACT_ABI_INTERFACE_JSON, GAME_CONTRACT_ADDRESS, null, 0, 'Click(uint256, uint256, string)', x, y, move);
}

async function Reset() {
    return await contractInteraction.Send(GAME_CONTRACT_ABI_INTERFACE_JSON, GAME_CONTRACT_ADDRESS, null, 0, 'Reset()');
}

// Game play
document.body.innerHTML = "<main id=\"main\" class=\"background\">\n" + "        <section class=\"display\">\n" + "            Player <span class=\"display-player playerX\">X</span>'s turn\n" + "        </section>\n" + "        <section class=\"container\">\n" + "            <div class=\"tile\"></div>\n" + "            <div class=\"tile\"></div>\n" + "            <div class=\"tile\"></div>\n" + "            <div class=\"tile\"></div>\n" + "            <div class=\"tile\"></div>\n" + "            <div class=\"tile\"></div>\n" + "            <div class=\"tile\"></div>\n" + "            <div class=\"tile\"></div>\n" + "            <div class=\"tile\"></div>\n" + "        </section>\n" + "        <section class=\"display announcer hide\"></section>\n" + "        <section class=\"controls\">\n" + "            <button id=\"reset\">Reset</button>\n" + "        </section>\n<section id='processing' class='hide' style='color: #f0f0f0'>Processing...</section>" + "    </main>"
window.addEventListener('DOMContentLoaded', () => {
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');

    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isGameActive = true;

    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const TIE = 'TIE';

    /*
        Indexes within the board
        [0] [1] [2]
        [3] [4] [5]
        [6] [7] [8]
    */

    const winningConditions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

    async function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
            isGameActive = false;
            const temp = await PlayboardView();
            alert(temp);
            return;
        }

        if (!board.includes('')) announce(TIE);
    }

    const announce = (type) => {
        switch (type) {
            case PLAYERO_WON:
                announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
                break;
            case PLAYERX_WON:
                announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
                break;
            case TIE:
                announcer.innerText = 'Tie';
        }
        announcer.classList.remove('hide');
    };

    const isValidAction = (tile) => {
        if (tile.innerText === 'X' || tile.innerText === 'O') {
            return false;
        }

        return true;
    };

    const updateBoard = (index) => {
        board[index] = currentPlayer;
    }

    const changePlayer = () => {
        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    }

    const userAction = (tile, index) => {
        if (isValidAction(tile) && isGameActive) {
            tile.innerText = currentPlayer;
            tile.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            changePlayer();
        }
    }

    const resetBoard = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        isGameActive = true;
        announcer.classList.add('hide');

        if (currentPlayer === 'O') {
            changePlayer();
        }

        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        });
    }

    const showProcessing = () => {
        document.getElementById("main").classList.add("disableEvent");
        document.getElementById("processing").classList.add('display');
        document.getElementById("processing").classList.remove('hide');
    }

    const hideProcessing = () => {
        document.getElementById("main").classList.remove("disableEvent");
        document.getElementById("processing").classList.remove('display');
        document.getElementById("processing").classList.add('hide');
    }

    const ResetGame = async () => {
        showProcessing();
        try {
            await Reset();
            console.log(await PlayboardView());
            resetBoard();
        } catch (e) {
            alert(e);
        }
        hideProcessing();
    }

    ResetGame().then(r => {
        tiles.forEach((tile, index) => {
            tile.addEventListener('click', async function (e) {
                try {
                    showProcessing();
                    const tx = await Click(Math.floor(index / 3), index % 3, currentPlayer)
                    console.log(await PlayboardView());
                    userAction(tile, index);
                } catch (e) {
                    alert(e);
                }
                hideProcessing();
            });
        });
    });
    resetButton.addEventListener('click', async function () {
        await ResetGame();
    });
});
// ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ Add your code here ↑↑↑↑↑↑↑↑↑↑↑↑↑↑