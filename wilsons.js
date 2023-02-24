function wilsons(rows, cols) {
    let maze = new Array(rows);

    for (let i = 0; i < rows; i++) {
        maze[i] = new Array(cols);
        maze[i].fill(0);
    }

    let start = randOddCoord(rows, cols);
    maze[start[0]][start[1]] = 1;

    while (!complete(maze)) {
        let c;
        do {
            c = randOddCoord(rows, cols);
        } while (maze[c[0]][c[1]] != 0);

        maze[c[0]][c[1]] = 2;

        let path = [c];
        while (maze[path[path.length - 1][0]][path[path.length - 1][1]] != 1) {
            let last = path[path.length - 1];
            let n = neighborsAB(maze, last[0], last[1]);
            let nb = n[Math.floor(Math.random() * n.length)];

            path.push(nb);

            maze[(nb[0] + last[0]) / 2][(nb[1] + last[1]) / 2] = 2;

            if (maze[nb[0]][nb[1]] == 1) {
                for (let i = 0; i < rows; i++) {
                    for (let j = 0; j < cols; j++) {
                        if (maze[i][j] == 2)
                            maze[i][j] = 1;
                    }
                }
            }
            else {
                maze[nb[0]][nb[1]] = 2;
                let loc = indexOfCoord(path, nb);
                if (loc != path.length - 1) {

                    let removed = path.splice(loc + 1, path.length - loc - 1);
                    maze[(nb[0] + last[0]) / 2][(nb[1] + last[1]) / 2] = 0;
                    last = path[path.length - 1];

                    for (let k = removed.length - 1; k >= 0; k--) {
                        let on = removed[k];
                        let next = k ? removed[k - 1] : last;

                        if (k != removed.length - 1)
                            maze[on[0]][on[1]] = 0;

                        maze[(on[0] + next[0]) / 2][(on[1] + next[1]) / 2] = 0;
                    }

                }

            }

        }

    }

    return maze;
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

function indexOfCoord(s, c) {
    for (let i = 0; i < s.length; i++) {
        if (s[i][0] == c[0] && s[i][1] == c[1])
            return i;
    }
    return -1;
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

function randOddCoord(rows, cols) {
    let c = new Array(2);
    c[0] = (Math.floor(Math.random() * Math.floor(rows / 2)) * 2) + 1;
    c[1] = (Math.floor(Math.random() * Math.floor(cols / 2)) * 2) + 1;
    return c;
}