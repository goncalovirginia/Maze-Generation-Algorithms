function huntAndKill(rows, cols) {
    let maze = new Array(rows);

    for (let i = 0; i < rows; i++) {
        maze[i] = new Array(cols);
        maze[i].fill(0);
    }

    let on = [1, 1];

    while (!complete(maze)) {
        let n = neighbors(maze, on[0], on[1]);

        if (n.length == 0) {
            let t = findCoord(maze);
            on = t[0];
            maze[on[0]][on[1]] = 1;
            maze[(on[0] + t[1][0]) / 2][(on[1] + t[1][1]) / 2] = 1;
        }
        else {
            let i = Math.floor(Math.random() * n.length);
            let nb = n[i];
            maze[nb[0]][nb[1]] = 1;
            maze[(nb[0] + on[0]) / 2][(nb[1] + on[1]) / 2] = 1;
            on = nb.slice();
        }
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

function neighborsAB(maze, ic, jc) {
    let final = [];

    for (let i = 0; i < 4; i++) {
        let n = [ic, jc];
        n[i % 2] += ((Math.floor(i / 2) * 2) || -2);
        if (n[0] < maze.length &&
            n[1] < maze[0].length &&
            n[0] > 0 &&
            n[1] > 0) {

            final.push(n);
        }
    }

    return final;
}

function complete(maze) {
    for (let i = 1; i < maze.length; i += 2) {
        for (let j = 1; j < maze[0].length; j += 2) {
            if (maze[i][j] != 1)
                return false;
        }
    }
    return true;
}

function findCoord(maze) {
    for (let i = 1; i < maze.length; i += 2) {
        for (let j = 1; j < maze[0].length; j += 2) {

            if (maze[i][j] == 0) {
                let n = neighborsAB(maze, i, j);

                for (let k = 0; k < n.length; k++) {
                    if (maze[n[k][0]][n[k][1]] == 1)
                        return [[i, j], n[k]];
                }
            }
        }
    }
}
