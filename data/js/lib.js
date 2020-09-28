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

function GetCurrentTime(){
    Date.prototype.format = function(f) {
        if (!this.valueOf()) return " ";
     
        var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
        var d = this;
         
        return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
            switch ($1) {
                case "yyyy": return d.getFullYear();
                case "yy": return (d.getFullYear() % 1000).zf(2);
                case "MM": return (d.getMonth() + 1).zf(2);
                case "dd": return d.getDate().zf(2);
                case "E": return weekName[d.getDay()];
                case "HH": return d.getHours().zf(2);
                case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
                case "mm": return d.getMinutes().zf(2);
                case "ss": return d.getSeconds().zf(2);
                case "a/p": return d.getHours() < 12 ? "오전" : "오후";
                default: return $1;
            }
        });
    };
    String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
    String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
    Number.prototype.zf = function(len){return this.toString().zf(len);};
    return new Date().format("yyyy.MM.dd HH:mm:ss");
}