const X_sign = "X";
const O_sign = "O";

const Player = {
    init: function (name, sign) {
        this.name = name;
        this.sign = sign;
        this.score = 0;
        return this;
    },
};

const Board = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];
    const MAX_INDEX = 8;
    const setSign = (index, sign) => {
        if (index <= MAX_INDEX) {
            board[index] = sign;
            return this;
        } else console.log("Index out of bounds!");
    };

    const empty = () => {
        for (let x in board) {
            board[x] = "";
        }
    };

    return {
        board, setSign, empty
    };
})();

const Game = (() => {

    const player1Name = window.prompt("Enter name for Player 1: ");
    const player2Name = window.prompt("Enter name for Player 1: ");

    const player1 = Object.create(Player).init(player1Name, X_sign);
    const player2 = Object.create(Player).init(player2Name, O_sign);

    let round = 1;
    let isOver = false;
    let overMessage = "";

    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [6, 4, 2]
    ];

    const getCurrentPlayerSign = () => {
        return round % 2 === 1 ? player1.sign : player2.sign;
    };

    const getNextPlayerSign = () => {
        return round % 2 === 1 ? player2.sign : player1.sign;
    };

    const getNextPlayerName = () => {
        return round % 2 === 1 ? player2.name : player1.name;
    };

    const getCurrentPlayerName = () => {
        return round % 2 === 1 ? player1.name : player2.name;
    };

    const playRound = () => {
        isOverMessage = checkIfOver();
        if (isOver === true) {
            gameOver(isOverMessage);
        }
        round++;
    };

    const reset = () => {
        round = 1;
        isOver = false;
    };

    const checkIfOver = () => {
        if (winConditions.some((cond) => {
            if (cond.every((i) => Board.board[i] === getCurrentPlayerSign())) return true;
        })) {
            isOver = true;
            return `${getCurrentPlayerName()} wins!`;
        } else if (round >= 9) {
            isOver = true;
            return "Draw!";
        }
    };

    const gameOver = (message) => {
        Display.updateStatus("", "", message);
    };

    const getIsOver = () => {
        return isOver;
    };

    return {
        player1,
        player2,
        getIsOver,
        getCurrentPlayerSign,
        getNextPlayerName,
        getNextPlayerSign,
        playRound,
        reset
    };

})();

const Display = (() => {
    const gameBoard = document.querySelector(".game-container");
    const cells = Array.from(gameBoard.children);
    const restartButton = document.querySelector(".game-restart");
    const gameStatus = document.querySelector(".game-status");

    const gameStartStatus = `On turn: ${Game.player1.name}\n Sign: ${Game.player1.sign} \nStatus: Start!`;
    
    gameStatus.innerText = gameStartStatus;

    const setStartStatus = () => {
        gameStatus.innerText = gameStartStatus;
    };

    cells.forEach((cell) => cell.addEventListener("click", () => {
        if (Board.board[cell.dataset.index] !== "" || Game.getIsOver()) return;
        else {
            Board.setSign(cell.dataset.index, Game.getCurrentPlayerSign());
            updateBoardDisplay();
            updateStatus(Game.getNextPlayerName(), Game.getNextPlayerSign(), "Game is running");
            Game.playRound();
        }
    }));


    restartButton.addEventListener("click", () => {
        Board.empty();
        updateBoardDisplay();
        setStartStatus();
        Game.reset();
    });

    const updateStatus = (player, sign, message) => {
        gameStatus.innerText = `On turn: ${player}\n Sign: ${sign} \nStatus: ${message}`;
    };

    const updateBoardDisplay = () => cells.forEach((cell) => cell.innerText = Board.board[cell.dataset.index]);

    return {
        updateStatus
    };

})();

