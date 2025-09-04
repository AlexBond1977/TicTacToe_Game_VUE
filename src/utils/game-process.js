// утилита для управления ходами человека и бота
export default {
//функция отвечающая за ход бота: получаем данные о свободных ячейках, если они имеются - выполняется
//рандомный ход от бота
    botMoving(board) {
        const availableCells = this.checkAvailableCell(board);
        if (availableCells.length > 0) {
            const botMoveNumber = this.getRandomMove(availableCells.length - 1);
            return {
                i: availableCells[botMoveNumber].i,
                j: availableCells[botMoveNumber].j,
            }
        }
        return null;
    },

// функция рандомного хода ботом
    getRandomMove(max) {
        return Math.floor(Math.random() * max);
    },

//функция поиска свободной ячейки для совершения хода ботом
    checkAvailableCell(board) {
        let cells = [];
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (board[i][j] === '') {
                    cells.push({i, j});
                }
            }
        }
        return cells;
    },

//функция для определения победителя
    checkPlayerWin(board, sign) {
        // проверка массива по горизонтали
        for (let i = 0; i < 3; i++) {
            if (board[0][i] === sign && board[1][i] === sign && board[2][i] === sign) {
                return true;
            }
        }
        // проверка массива по вертикали
        for (let i = 0; i < 3; i++) {
            if (board[i][0] === sign && board[i][1] === sign && board[i][2] === sign) {
                return true;
            }
        }
        // проверка по диагоналям
        if (board[0][0] === sign && board[1][1] === sign && board[2][2] === sign){
            return true;
        }
        if (board[2][0] === sign && board[1][1] === sign && board[0][2] === sign){
            return true;
        }

        return false;
    },

};