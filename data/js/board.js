(function(){
    AddEvent("write-post", "click", () => {location.href = "/board-write"})

    GetList({});
    TagGenerator();

    function GetList(filter){
        Post("/get-post-list", filter, (data) => {
            document.body.removeChild(document.getElementById('list'));
            var list = document.createElement("div");
            list.className = 'board-list';
            list.setAttribute('id', 'list');
            document.body.appendChild(list);

            data.forEach(post => {
                console.log(post);

                let span = document.createElement('span');
                span.className = "post";
                span.dataset.id = post.index;
    
                let tag = document.createElement('span');
                tag.className = "tag";
                tag.innerHTML = "[" + gameList[post.tag] + "]";
                span.appendChild(tag);
    
                let title = document.createElement('span');
                title.innerHTML = post.title;
                span.appendChild(title);
                list.appendChild(span);

                let date = document.createElement('span');
                date.className = "date";
                date.innerHTML = post.date;
                span.appendChild(date);
    
                AddEvent(span, "click", function(e){
                    location.href = '/board/view/?no=' + post.index;
                })
    
            });
        });
    
    }

    function TagGenerator(){
        let tags = [];
        let taglist = document.getElementById("taglist");
        let tag = document.createElement('div');

        tag.className = 'board-tag selected';
        tag.innerHTML = "전체";
        taglist.appendChild(tag);
        tags.push(tag);
        
        Object.keys(gameList).forEach((e) => {
            let tag = document.createElement('div');
            tag.className = 'board-tag';
            tag.innerHTML = gameList[e];
            tag.dataset.tag = e;
            taglist.appendChild(tag);
            tags.push(tag);
        })

        tags.forEach((element) =>{
            element.addEventListener("click" ,function(e){
                tags.forEach(element => element.classList.remove("selected"));
                GetList({tag : element.dataset.tag});
                element.classList.add("selected");
            })
        })
    }
})();
