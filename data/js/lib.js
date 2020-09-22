function AddEvent(element, event, callback) {
    if (typeof (element) == "string") {
        element = element.split(" ");
        element.forEach((element) => {
            document.getElementById(element).addEventListener(event, (e) => {
                callback(e);
            })
        });
    }
    else{
        element.length ? element.forEach(element => element.addEventListener(event, (e) => {
            console.log(1)
            callback(e);
        })) :
        element.addEventListener(event, (e) => {
            console.log(2)
            callback(e);
        });
    }
}

function Show(element){
    if (typeof (element) == "string") {
        element = element.split(" ");
        element.forEach((element) => {
            document.getElementById(element).style.display = "block";
        });
    }
    else{
        element.length ? element.forEach(element => element.style.display = 'block') :
                         element.style.display = "block";
    }
}

function Hide(element){
    if (typeof (element) == "string") {
        element = element.split(" ");
        element.forEach((element) => {
            document.getElementById(element).style.display = "none";
        });
    }
    else{
        element.length ? element.forEach(element => element.style.display = 'none') :
                         element.style.display = "none";
    }
}

function Post(url, data){
    data = JSON.stringify(data);
    let xml = new XMLHttpRequest();
    xml.open("POST", url);
    xml.setRequestHeader('Content-Type', 'application/json');
    xml.send(data);
    xml.addEventListener("readystatechange", () =>{
        if(xml.readyState == xml.DONE && xml.status){
            console.log(xml.responseText);
        }
    })
}