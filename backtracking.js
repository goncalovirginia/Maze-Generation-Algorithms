function backtracking(rows, cols) {
    let maze = new Array(rows);

    for (let i = 0; i < rows; i++) {
        maze[i] = new Array(cols);
        maze[i].fill(0);
    }

    let start = [];
    do {
        start[0] = Math.floor(Math.random() * rows)
    } while (start[0] % 2 == 0);
    do {
        start[1] = Math.floor(Math.random() * cols)
    } while (start[1] % 2 == 0);

    maze[start[0]][start[1]] = 1;

    let openCells = [start];

    while (openCells.length) {
        let cell, n;
        openCells.push([-1, -1]);

        do {
            openCells.pop();
            if (openCells.length == 0)
                break;
            cell = openCells[openCells.length - 1];
            n = neighbors(maze, cell[0], cell[1]);
        } while (n.length == 0 && openCells.length > 0);

        if (openCells.length == 0)
            break;

        let choice = n[Math.floor(Math.random() * n.length)];
        openCells.push(choice);

        maze[choice[0]][choice[1]] = 1;
        maze[(choice[0] + cell[0]) / 2][(choice[1] + cell[1]) / 2] = 1;
    }

    return maze;
}

function neighbors(maze, ic, jc) {
    let final = [];

    for (let i = 0; i < 4; i++) {
        let n = [ic, jc];
        n[i % 2] += ((Math.floor(i / 2) * 2) || -2);

        if (n[0] < maze.length &&
            n[1] < maze[0].length &&
            n[0] > 0 &&
            n[1] > 0) {

            if (maze[n[0]][n[1]] == 0) {
                final.push(n);
            }
        }
    }

    return final;
}
