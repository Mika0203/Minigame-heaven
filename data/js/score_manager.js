class ScoreManagerClass {
    constructor(){
        this.score = 0;
        this.highscore = 0;

        this.scoreform = document.createElement("div");
        this.scoreform.innerHTML = "Score"
        document.body.appendChild(this.scoreform);
    }

    updateScore(){
        this.scoreform.innerHTML = this.score;
    }

    addScore(num){
        this.score += parseInt(num);
        this.updateScore();
    };
    
    decreaseScore(num){
        this.score -= parseInt(num);
        this.updateScore();
    }

    getHighScore(){
        this.highscore = 0;
    };

    isHighScore(score){
        return true ? true : false; 
    };

    saveHighScore(){
    };

    reset(){
        this.score = 0;
        this.updateScore();
    }

}

var ScoreManager = new ScoreManagerClass();