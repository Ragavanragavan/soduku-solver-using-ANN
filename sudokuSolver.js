function tableToArray(table) {
    let result = [].reduce.call(table.rows, function (result, row) {
        result.push([].reduce.call(row.cells, function (res, cell) {
            res.push(parseInt(cell.children[0].value) || 0);
            return res;
        }, []));
        return result;
    }, []);

    return result;
}

function checkInput(value) {
    let regex = /^\d*$/.test(value) && parseInt(value) > 0 && parseInt(value) <= 9;
    return !regex ? value.replace(value, '') : value
}

function checkColumn(board, column, value) {
    for (let i = 0; i < board.length; i++) {
        if (board[i][column] === value) {
            return false;
        }
    }

    return true;
}

function checkRow(board, row, value) {
    for (let i = 0; i < board[row].length; i++) {
        if (board[row][i] === value) {
            return false;
        }
    }

    return true;
}

function checkSquare(board, row, column, value) {
    let squareRow = Math.floor(row / 3) * 3;
    let squareCol = Math.floor(column / 3) * 3;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[squareRow + i][squareCol + j] === value)
                return false;
        }
    }

    return true;
};

function checkValue(board, row, column, value) {
    if (checkRow(board, row, value) &&
        checkColumn(board, column, value) &&
        checkSquare(board, row, column, value)) {
        return true;
    }

    return false;
};

function findEmptyCell(board) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] === 0)
                return [i, j];
        }
    }

    return [-1, -1];
}

function solve(board) {
    let table = document.getElementById('sudoku');
    let emptyCell = findEmptyCell(board);
    let row = emptyCell[0];
    let col = emptyCell[1];

    if (row === -1 || col === -1) {
        return board;
    }

    let num = 1;
    do {
        if (checkValue(board, row, col, num)) {
            board[row][col] = num;
            let inputCell = table.rows[row].cells[col].children[0];
            inputCell.value = num;
            inputCell.classList.add("input-solved"); // add class css
            solve(board);
        }
    } while (++num <= 9)

    if (findEmptyCell(board)[0] !== -1) {
        board[row][col] = 0;
    }

    return board;
}

function resetInputs() {
    let inputs = document.getElementsByTagName("input");
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].type == "text") {
            inputs[i].value = "";
            inputs[i].classList.remove("input-solved"); // remove class css
        }
    }
}

function main(table) {
    let board = tableToArray(table);
    solve(board);
}