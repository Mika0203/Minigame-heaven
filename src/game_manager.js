class GameManager {
    constructor(){
        this.isStart = false;
        window.addEventListener("keydown", key => {
            switch (key.key) {
                case "r":
                    this.reset();
                    this.gameStart();
                    break;
            }
        })
    }
    
    init(){};

    gameStart(){
        //hide notice;
        console.debug("Game Start!!");
        this.isStart = true;
        this.onGameStart();
        ScoreManager.reset();
    };
    
    gameOver(){
        //show notice;
        console.debug("Game Over!!");
        this.isStart = false;
    };

    reset(){};
    onGameStart(){};
}