let tag = document.getElementById("tag");

Object.keys(gameList).forEach((game) => {
    let op = document.createElement("option");
    op.value = game;
    op.innerHTML = gameList[game];
    tag.appendChild(op);
})

document.getElementById("upload").addEventListener("click", () => {
    
    let data = {
        title   : document.getElementById("title").value,
        content : document.getElementById("content").value,
        userid  : 'testuser',
    }

    Post('/write-post', data);
})