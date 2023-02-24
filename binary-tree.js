function binaryTree(rows, cols) {
    let maze = new Array(rows);

    for (let i = 0; i < rows; i++) {
        maze[i] = new Array(cols);
        for (let j = 0; j < cols; j++) {
            maze[i][j] = (i % 2 == 1 && j % 2 == 1) + 0;
        }
    }
    
    for (let i = 1; i < cols; i += 2) {
        for (let j = 1; j < rows; j += 2) {
            let south = Math.floor(Math.random() * 2);
            
            if (j == rows - 2)
                south = 0;
            if (i == cols - 2)
                south = 1;
            if (i == cols - 2 && j == rows - 2)
                break;
            
            if (south)
                maze[j + 1][i] = 1;
            else
                maze[j][i + 1] = 1;
        }
    }
    
    return maze;
}
