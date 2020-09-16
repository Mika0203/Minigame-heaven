class GameManager {
    constructor(){
        this.score = 0;
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
        console.debug("Game Start!!");
        Hide("notice");
        this.isStart = true;
        this.onGameStart();
    };

    gameOver(){
        Show("notice");
        console.debug("Game Over!!");
        this.isStart = false;
    };

    reset(){};
    onGameStart(){};
}