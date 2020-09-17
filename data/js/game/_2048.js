let manager = new GameManager();

manager.tableSize = new Array(4, 4);
manager.table = [];
manager.isMoved = true;

manager.init = function (id) {
    let div = document.getElementById(id);
    let _this = this;

    let table = document.createElement('table');
    table.className = "_2048table"
    div.appendChild(table);

    for (let y = 0; y < this.tableSize[1]; y++) {
        let row = table.insertRow();
        this.table.push(new Array(this.tableSize[0]));
        for (let x = 0; x < this.tableSize[0]; x++) {
            this.table[y][x] = row.insertCell();
        }
    }

    window.addEventListener("keydown", key => {
        switch (key.key) {
            case "ArrowDown":
                _this.down();
                break;
            case "ArrowUp":
                _this.up();
                break;
            case "ArrowRight":
                _this.right();
                break;
            case "ArrowLeft":
                _this.left();
                break;
        }
    })
}

manager.onGameStart =  function(){
    this.isStart = true;
    this.isMoved = true;
    this.addNum();
}

manager.addNum = function () {
    if(!this.gameOverCheck()){
        this.isStart = false;
        this.gameOver();
    }

    if(!this.isMoved) return;
    this.isMoved = false;

    let blank = [];
    this.table.forEach(element => {
        element.forEach(td => {
            if (td.innerHTML == "")
                blank.push(td);
        })
    });

    if (blank.length > 0) {
        let cell = blank[Math.floor(Math.random() * 10 % blank.length)];
        let rand = (Math.floor(Math.random() * 10 % 2) + 1) * 2;
        cell.innerHTML = rand;
        cell.className = "b"+rand;
    }
}

manager.left = function () {
    if(!this.isStart) return;

    for (let x = 1; x <= this.tableSize[0] - 1; x++) {
        for (var y = 0; y < this.tableSize[1]; y++) {
            let td = this.table[y][x];
            if (td.innerHTML != "") {
                this.move([x, y], "left");
            }
        }
    }
    this.addNum();
}

manager.right = function () {
    if(!this.isStart) return;

    for (let x = this.tableSize[0] - 2; x >= 0; x--) {
        for (var y = 0; y < this.tableSize[1]; y++) {
            let td = this.table[y][x];
            if (td.innerHTML != "") {
                this.move([x, y], "right");
            }
        }
    }
    this.addNum();
}

manager.up = function () {
    if(!this.isStart) return;

    for (let y = 1; y <= this.tableSize[1] - 1; y++) {
        for (var x = 0; x < this.tableSize[0]; x++) {
            let td = this.table[y][x];
            if (td.innerHTML != "") {
                this.move([x, y], "up");
            }
        }
    }
    this.addNum();
}

manager.down = function () {
    if(!this.isStart) return;

    for (let y = this.tableSize[1] - 2; y >= 0; y--) {
        for (var x = 0; x < this.tableSize[0]; x++) {
            let td = this.table[y][x];
            if (td.innerHTML != "") {
                this.move([x, y], "down");
            }
        }
    }
    this.addNum();
}

manager.gameOverCheck = function() {
    for (let y = 0; y < this.tableSize[1]; y++) {
        for (var x = 0; x < this.tableSize[0]; x++) {
            if (GetTableValue([x, y]) == "")
                return true;
        }
    }

    for (let y = 0; y < this.tableSize[1]; y++) {
        for (var x = 0; x < this.tableSize[0]; x++) {
            let right = GetTableValue([x+1,y]);
            let down = GetTableValue([x,y+1]);

            if(right && right == this.table[y][x].innerHTML){
                return true;
            }

            if(down && down == this.table[y][x].innerHTML){
                return true;
            }
        }
    }



    return false;
}

manager.move = function(from, command){
    let to = from.slice();

    switch (command) {
        case "left":
            to[0] -= 1;
            break;
        case "right":
            to[0] += 1;
            break;
        case "up":
            to[1] -= 1;
            break;
        case "down":
            to[1] += 1;
            break;
    }

    if (GetTableValue(to) === false) {
        return false;
    }

    if (GetTableValue(from) == GetTableValue(to) || GetTableValue(to) == "") {
        MoveToTable(from, to);
        this.isMoved = true;
    }

    this.move(to, command);
}

manager.reset = function(){
    for (let y = 0; y < this.tableSize[1]; y++) {
        for (var x = 0; x < this.tableSize[0]; x++) {
            this.table[y][x].innerHTML = "";
            this.table[y][x].className = "";
        }
    }
}

function GetTableValue(coordinates) {
    try {
        return manager.table[coordinates[1]][coordinates[0]].innerHTML;
    }
    catch {
        return false;
    }
}

function RemoveTableValue(coordinates) {
    let cell = manager.table[coordinates[1]][coordinates[0]];
    cell.innerHTML = "";
    cell.className = "";
}

function MoveToTable(from, to) {
    let fromval = manager.table[from[1]][from[0]].innerHTML;
    let cell = manager.table[to[1]][to[0]];
    let toval = cell.innerHTML;

    if (fromval == toval) {
        fromval = fromval * 2;
    }

    cell.innerHTML = fromval;
    cell.className = "b" + fromval;
    RemoveTableValue(from);
}