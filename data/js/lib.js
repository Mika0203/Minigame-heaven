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

function Get(url, callback){
    let xml = new XMLHttpRequest();
    xml.open("GET", url);
    xml.send();
    xml.addEventListener("readystatechange", () =>{
        if(xml.readyState == xml.DONE && xml.status){
            callback(JSON.parse(xml.responseText));
        }
    })
}

function Post(url, data ,callback){
    data = JSON.stringify(data);
    let xml = new XMLHttpRequest();
    xml.open("POST", url);
    xml.setRequestHeader('Content-Type', 'application/json');
    xml.send(data);
    xml.addEventListener("readystatechange", () =>{
        if(xml.readyState == xml.DONE && xml.status){
            callback(JSON.parse(xml.responseText));
        }
    })
}

function GetParamsFromURL(){
    let str =location.href.split('?');
    let obj = new Object();

    for(let i = 1 ; i< str.length; i++){
        let sp = str[i].split('=');
        obj[sp[0]] = sp[1];
    }

    return obj;
}

