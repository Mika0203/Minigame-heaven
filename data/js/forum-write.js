let tag = document.getElementById("tag");

Object.keys(gameList).forEach((game) => {
    let op = document.createElement("option");
    op.value = game;
    op.innerHTML = gameList[game];
    tag.appendChild(op);
})
