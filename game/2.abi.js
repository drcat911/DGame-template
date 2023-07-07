const TicTacToeContractAddress = "0xA03e00359677Df7f03d94DA2902dc4bCF360fB84"
const TicTacToeAbiJson = [{
    "inputs": [{
        "internalType": "uint256", "name": "x", "type": "uint256"
    }, {
        "internalType": "uint256", "name": "y", "type": "uint256"
    }, {
        "internalType": "string", "name": "move", "type": "string"
    }], "name": "Click", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [], "name": "Reset", "outputs": [], "stateMutability": "nonpayable", "type": "function"
}, {
    "inputs": [], "stateMutability": "nonpayable", "type": "constructor"
}, {
    "inputs": [{
        "internalType": "uint256", "name": "", "type": "uint256"
    }, {
        "internalType": "uint256", "name": "", "type": "uint256"
    }], "name": "playboard", "outputs": [{
        "internalType": "string", "name": "", "type": "string"
    }], "stateMutability": "view", "type": "function"
}, {
    "inputs": [], "name": "PlayboardView", "outputs": [{
        "internalType": "string", "name": "result", "type": "string"
    }], "stateMutability": "view", "type": "function"
}, {
    "inputs": [], "name": "totalMove", "outputs": [{
        "internalType": "uint256", "name": "", "type": "uint256"
    }], "stateMutability": "view", "type": "function"
}]