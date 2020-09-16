class GameManager {
    constructor(){
        this.score = 0;
        this.isStart = false;
    }
    
    init(){};

    gameStart(){
        console.debug("Game Start!!");
        this.isStart = true;
        this.onGameStart();
    };

    gameOver(){
        let div = document.createElement("div");
        div.innerHTML = "Game Over";
        document.body.appendChild(div);
        
        console.debug("Game Over!!");
        this.isStart = false;
    };

    onGameStart(){};
}