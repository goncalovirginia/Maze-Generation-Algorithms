function aldousBroder(rows, cols) {
    var maze = new Array(rows);
    var unvisited = 0;
    
    for (var i = 0; i < rows; i++) {
        maze[i] = new Array(cols);
        for (var j = 0; j < cols; j++) {
            var add = i % 2 == 1 && j % 2 == 1;
            if (add)
                unvisited++;
            maze[i][j] = 0;
        }
    }
    var on = [];
    
    do {
        on[0] = Math.floor(Math.random() * rows);
        on[1] = Math.floor(Math.random() * cols);
    } while (on[0] % 2 == 0 || on[1] % 2 == 0);
    
    maze[on[0]][on[1]] = 1;
    unvisited--;
    
    while (unvisited > 0) {
        var n = neighborsAB(maze, on[0], on[1]);
        if (!n.length) { 
            console.log(maze);
            console.log(on);
            break;
        }
        
        var to = n[Math.floor(Math.random() * n.length)];
        
        if (maze[to[0]][to[1]] == 0) {
            maze[to[0]][to[1]] = 1;
            maze[(to[0] + on[0]) / 2][(to[1] + on[1]) / 2] = 1;
            unvisited--;
        }
        on = to;
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
