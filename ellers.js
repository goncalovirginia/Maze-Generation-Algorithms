function ellers(rows, cols) {
    let maze = new Array(rows);

    for (let i = 0; i < rows; i++) {
        maze[i] = new Array(cols);
        for (let j = 0; j < cols; j++) {
            maze[i][j] = (i % 2 == 1 && j % 2 == 1) + 0;
        }
    }

    let sets = [];
    for (let i = 1; i < cols; i += 2) {
        sets.push([[1, i]]);
    }

    for (let i = 1; i < rows; i += 2) {
        for (let m = 0; m < sets.length; m++) {
            for (let n = 0; n < sets[m].length; n++) {
                if (sets[m][n][0] < i)
                    sets[m].splice(n, 1);
            }
        }

        for (let j = 3; j < cols; j += 2) {
            let set1 = indexOfSet(sets, [i, j - 2]);
            let set2 = indexOfSet(sets, [i, j]);
            if (set1 != set2) {

                let join = (i != rows - 2) ? Math.floor(Math.random() * 2) : 1;

                if (join) {
                    let removed = sets.splice(set2, 1)[0];
                    if (set2 < set1) {
                        set1--;
                    }

                    sets[set1] = sets[set1].concat(removed);
                    maze[i][j - 1] = 1;
                }
            }
        }

        if (i == rows - 2)
            break;

        let initialSetLength = sets.length;
        for (let j = 0; j < initialSetLength; j++) {
            let continued = false;

            let initialLength = sets[j].length;
            for (let k = 0; k < initialLength; k++) {

                let newCoord = sets[j][k].slice();
                newCoord[0] += 2;

                if (newCoord[0] != i + 2)
                    continue;

                let add = Math.floor(Math.random() * 2);
                if (add) {
                    continued = true;
                    sets[j].push(newCoord);
                    maze[newCoord[0] - 1][newCoord[1]] = 1;

                }
                else
                    sets.push([newCoord]);
            }
            if (!continued) {
                let ind;
                do {
                    ind = Math.floor(Math.random() * sets[j].length);
                } while (sets[j][ind][0] != i);
                let newC = sets[j][ind].slice();
                newC[0] += 2;

                sets.splice(indexOfSet(sets, newC), 1);

                sets[j].push(newC);
                maze[newC[0] - 1][newC[1]] = 1;
            }
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
