function recursiveDivision(rows, cols) {
    let maze = new Array(rows);

    for (let i = 0; i < rows; i++) {
        maze[i] = (new Array(cols));
        for (let j = 0; j < cols; j++) {
            maze[i][j] = !(i == 0 || j == 0 || i == rows - 1 || j == cols - 1) + 0;
        }
    }

    divide(maze, [1, rows - 2], [1, cols - 2], horv(1, 1));
    return maze;
}

function divide(maze, iCoords, jCoords, hv) {
    let iDim = iCoords[1] - iCoords[0];
    let jDim = jCoords[1] - jCoords[0];

    if (iDim <= 0 || jDim <= 0)
        return;
        
    if (hv == "h") {
        let split;
        do {
            split = Math.floor(Math.random() * (iDim + 1)) + iCoords[0];
        } while (split % 2);

        let hole;
        do {
            hole = Math.floor(Math.random() * (jDim + 1)) + jCoords[0];
        } while (!(hole % 2));

        for (let j = jCoords[0]; j <= jCoords[1]; j++) {
            if (j != hole)
                maze[split][j] = 0;
        }

        divide(maze, [iCoords[0], split - 1], jCoords, horv(split - iCoords[0] - 1, jDim));
        divide(maze,[split + 1, iCoords[1]], jCoords, horv(iCoords[1] - split - 1, jDim));
    }
    else {
        let split;
        do {
            split = Math.floor(Math.random() * (jDim + 1)) + jCoords[0];
        } while (split % 2);

        let hole;
        do {
            hole = Math.floor(Math.random() * (iDim + 1)) + iCoords[0];
        } while (!(hole % 2));

        for (let i = iCoords[0]; i <= iCoords[1]; i++) {
            if (i != hole) {
                maze[i][split] = 0;
            }
        }

        divide(maze, iCoords, [jCoords[0], split - 1], horv(iDim, split - jCoords[0] - 1));
        divide(maze, iCoords, [split + 1, jCoords[1]], horv(jCoords[0] - split - 1));
    }
}

function horv(iDim, jDim) {
    if (iDim < jDim)
        return "v";
    if (jDim < iDim)
        return "h";
    return Math.floor(Math.random() * 2) ? "h" : "v";
}
