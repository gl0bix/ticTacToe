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

    return {
        board, setSign
    };
})();



const Game = (() => {

    const player1 = Object.create(Player).init("Player1", X_sign);
    const player2 = Object.create(Player).init("Player2", O_sign);

    let round = 1;
    let isOver = false;

    const getCurrentPlayerSign = () => {
        return round % 2 === 1 ? player1.sign : player2.sign;
    };

    const playRound = () => round++;

    const reset = () => {
        round = 1;
        Board.clearBoard();
    };

    return {
        player1,
        player2,
        getCurrentPlayerSign,
        playRound,
        reset
    };

})();

const Display = (() => {
    const gameBoard = document.querySelector(".game-container");
    const cells = Array.from(gameBoard.children);
    const restartButton = document.querySelector(".game-restart");
    const gameStatus = document.querySelector(".game-status");

    cells.forEach((cell) => cell.addEventListener("click", () => {
        if (Board.board[cell.dataset.index] === "")
            Board.setSign(cell.dataset.index, Game.getCurrentPlayerSign());
        updateBoard();
        updateStatus("Game is running");
        Game.playRound();
    }));

    restartButton.addEventListener("click", () => {
        //TODO
    });


    const updateStatus = (message) => {
        gameStatus.innerText = `Status: ${message}`;
    };

    const updateBoard = () => cells.forEach((cell) => cell.innerText = Board.board[cell.dataset.index]);

    return {

    };

})();
