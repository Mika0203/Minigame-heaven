let gameTitle = location.href.split("/");
gameTitle = gameTitle[gameTitle.length-1];

const scriptPath = "/js/game/" + gameTitle + ".js";

let script = document.createElement("script");
script.src = scriptPath;
document.body.appendChild(script);
script.onload = function(){
    console.log(manager);
    manager.init("table")
}

