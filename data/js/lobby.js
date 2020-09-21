
(function(){
    let listdiv = document.getElementById("game-list");
    Object.keys(gameList).forEach((game) => {
        let gamename = gameList[game];
        let btn = document.createElement("button");
        btn.innerHTML = gamename;
        console.log(btn)
        AddEvent(btn, "click", (e) =>{
            console.log(game);
            location.href = "/game/" + game;
        })
        listdiv.appendChild(btn);
    })
})();