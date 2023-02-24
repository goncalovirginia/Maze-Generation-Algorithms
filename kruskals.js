function kruskals(rows, cols) {
    let maze = new Array(rows);
    let sets = [];
    let edges = [];
    
    for (let i = 0; i < rows; i++) {
        maze[i] = new Array(cols);
        for (let j = 0; j < cols; j++) {
            let add = i % 2 == 1 && j % 2 == 1;
            maze[i][j] = add + 0;

            if (add)
                sets.push([[i, j]]);
            if (i != rows - 2 && add)
                edges.push([i + 1, j]);
            if (j != cols - 2 && add)
                edges.push([i, j + 1]);
        }
    }
    
    while (edges.length) {
        let index = Math.floor(Math.random() * edges.length);
        let removed = edges.splice(index, 1)[0];
        
        let iorj = removed[0] % 2;
        
        let cell1, cell2;
        
        if (iorj) {
            cell1 = [removed[0], removed[1] - 1];
            cell2 = [removed[0], removed[1] + 1];
        }
        else {
            cell1 = [removed[0] - 1, removed[1]];
            cell2 = [removed[0] + 1, removed[1]];
        }
    
        let i1 = indexOfSet(sets, cell1);
        let i2 = indexOfSet(sets, cell2);
        
        if (i1 != i2) {
            let add = sets.splice(i2, 1)[0];
            if (i2 < i1)
                i1--;
            sets[i1] = sets[i1].concat(add);
            maze[removed[0]][removed[1]] = 1;
        }
    }
    
    return maze;
}

function indexOfSet(sets, c) {
    for (let i = 0; i < sets.length; i++) {
        if (contains(sets[i], c))
            return i;
    }
    return -1;
}

function contains(s, c) {
    for (let i = 0; i < s.length; i++) {
        if (s[i][0] == c[0] && s[i][1] == c[1])
            return true;
    }
    return false;
}
