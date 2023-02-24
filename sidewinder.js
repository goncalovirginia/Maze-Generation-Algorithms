function sidewinder(rows, cols) {
    let maze = new Array(rows);

    for (let i = 0; i < rows; i++) {
        maze[i] = new Array(cols);
        for (let j = 0; j < cols; j++) {
            maze[i][j] = (i % 2 == 1 && j % 2 == 1) + 0;
        }
    }

    for (let row = 1; row < rows; row += 2) {
        let begin = 1;

        for (let col = 1; col < cols; col += 2) {
            let ctn = (row == 1) ? 1 : Math.floor(Math.random() * 2);
            if (col == cols - 2) ctn = 0;

            if (ctn) {
                maze[row][col + 1] = 1;
            }
            else if (row != 1) {
                let up;
                do {
                    up = Math.floor(Math.random() * (col - begin)) + begin;
                } while (!(up % 2));

                maze[row - 1][up] = 1;
                begin = col + 2;
            }
        }
    }

    return maze;
}
