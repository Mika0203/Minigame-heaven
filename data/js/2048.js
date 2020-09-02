
class _2048ManagerClass {
    constructor() {
        this.tableSize = new Array(4,4);
        this.table = [];
        this.score = 0;
    }

    init(id) {
        let div = document.getElementById(id);
        let _this = this;

        div.innerHTML = "hi";

        let table = document.createElement('table');
        table.className = "_2048table"
        div.appendChild(table);

        for(let y = 0; y < this.tableSize[1]; y++){
            let row = table.insertRow();
            this.table.push(new Array(this.tableSize[0]));
            for(let x = 0; x < this.tableSize[0]; x++){
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

        this.addNum();
    };

    addNum() {
        let blank = [];
        this.table.forEach(element => {
            element.forEach(td => {
                if(td.innerHTML == "")
                    blank.push(td);
            })
        });
        if(blank.length > 0)
            blank[Math.floor(Math.random() * 10 % blank.length)].innerHTML = 2;
    };

    down() {
        for(let y = this.tableSize[1] - 2; y >= 0 ; y--){
            for(var x = 0; x < this.tableSize[0] ; x++){
                let td = this.table[y][x];
                if(td.innerHTML != ""){
                    movedown(x,y,this);
                }  
            }
        }

        console.log("down");
        this.addNum();

        function movedown(x,y,_this){
            console.log("movedown",x,y);
        }
    };
    
    left() {
        console.log("left");
        this.addNum();
    };
    
    right() {
        console.log("right");
        this.addNum();
    };
    
    up() {
        console.log("up");
        this.addNum();
    };
}

let _2048Manager = new _2048ManagerClass();

_2048Manager.init("2048")
