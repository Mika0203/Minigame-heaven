(function(){
    AddEvent("write-post", "click", () => {location.href = "/forum-write"})

    Get("/get-post-list", (data) => {
        let list = document.getElementById("list");

        data.forEach(post => {
            console.log(post);

            let span = document.createElement('span');
            span.className = "post";

            let tag = document.createElement('span');
            tag.className = "tag";
            tag.innerHTML = "[" + post.tag + "]";
            span.appendChild(tag);

            let title = document.createElement('span');
            title.innerHTML = post.title;
            span.appendChild(title);
            list.appendChild(span);
            
        });
    });
})();

