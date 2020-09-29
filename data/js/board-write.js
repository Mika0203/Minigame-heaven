let tag = document.getElementById("tag");

Object.keys(gameList).forEach((game) => {
    let op = document.createElement("option");
    op.value = game;
    op.innerHTML = gameList[game];
    tag.appendChild(op);
})

document.getElementById("upload").addEventListener("click", () => {
    let data = {
        tag     : tag.value,
        title   : document.getElementById("title").value,
        content : document.getElementById("content").value,
        userid  : 'testuser',
    }

    Post('/write-post', data, (code) => {
        if(code == 1){
            alert("글 작성되었습니다");
            location.href = '/board';
        }
    });
})