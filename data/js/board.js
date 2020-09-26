(function(){
    AddEvent("write-post", "click", () => {location.href = "/board-write"})

    Get("/get-post-list", (data) => {
        let list = document.getElementById("list");

        data.forEach(post => {
            console.log(post);

            let span = document.createElement('span');
            span.className = "post";
            span.dataset.id = post.index;

            let tag = document.createElement('span');
            tag.className = "tag";
            tag.innerHTML = "[" + post.tag + "]";
            span.appendChild(tag);

            let title = document.createElement('span');
            title.innerHTML = post.title;
            span.appendChild(title);
            list.appendChild(span);

            AddEvent(span, "click", function(e){
                location.href = '/board/view/?no=' + post.index;
            })

        });
    });
})();

