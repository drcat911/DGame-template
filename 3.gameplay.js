// ↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓ Add your code here ↓↓↓↓↓↓↓↓↓↓↓↓↓↓

// test call
async function CallData() {
    const abijson = [{
        "inputs": [{
            "internalType": "address", "name": "", "type": "address"
        }, {
            "internalType": "address", "name": "", "type": "address"
        }], "name": "_biddingBalance", "outputs": [{
            "internalType": "uint256", "name": "", "type": "uint256"
        }], "stateMutability": "view", "type": "function"
    }];
    return await contractInteraction.Call(abijson, '0x85802F1f36F549334EeeEf6715Ed16555ed7178b', '_biddingBalance(address,address)', '0xE6BA4C6bA1A073202AB9c09a5Dec923b78D28ff2', '0x095442A025B1772093473b018ec9A9c427E6e806')
}

async function SendData() {
    const abijson = [{
        "inputs": [{
            "internalType": "address", "name": "", "type": "address"
        }, {
            "internalType": "address", "name": "", "type": "address"
        }], "name": "_biddingBalance", "outputs": [{
            "internalType": "uint256", "name": "", "type": "uint256"
        }], "stateMutability": "view", "type": "function"
    }];
    return await contractInteraction.Send(abijson, '', null, 0, '', '');
}

document.body.innerHTML = "<main class=\"background\">\n" + "        <section class=\"display\">\n" + "            Player <span class=\"display-player playerX\">X</span>'s turn\n" + "        </section>\n" + "        <section class=\"container\">\n" + "            <div class=\"tile\"></div>\n" + "            <div class=\"tile\"></div>\n" + "            <div class=\"tile\"></div>\n" + "            <div class=\"tile\"></div>\n" + "            <div class=\"tile\"></div>\n" + "            <div class=\"tile\"></div>\n" + "            <div class=\"tile\"></div>\n" + "            <div class=\"tile\"></div>\n" + "            <div class=\"tile\"></div>\n" + "        </section>\n" + "        <section class=\"display announcer hide\"></section>\n" + "        <section class=\"controls\">\n" + "            <button id=\"reset\">Reset</button>\n" + "        </section>\n" + "    </main>"
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

    function handleResultValidation() {
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

    tiles.forEach((tile, index) => {
        tile.addEventListener('click', async function () {
            userAction(tile, index);
            try {
                const data = await TryCall();
                console.log("callContract data", data);
            } catch (e) {
                console.log(e);
            }
        });
    });

    resetButton.addEventListener('click', async function () {
        resetBoard();
    });
});
// ↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑ Add your code here ↑↑↑↑↑↑↑↑↑↑↑↑↑↑