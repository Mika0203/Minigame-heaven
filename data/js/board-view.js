Post('/board/get-post-data', GetParamsFromURL(), function(data){
    if(!data){
        alert("삭제된 게시물입니다");
        location.href = "/board";
    }
    console.log(data);
    document.getElementById("title").innerHTML = data.title;
    document.getElementById("content").innerHTML = data.content;
    document.getElementById("delete").addEventListener("click", () => {
        if(confirm("삭제하시겠습니까?")){
            Post('/board/delete-post', {no:data.index}, function(res){
                if(res){
                    alert("삭제되었습니다");
                    location.href = "/board";
                }
            })
        }
    })
})