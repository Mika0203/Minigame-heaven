function AddEvent(element, event, callback) {
    if (typeof (element) == "string") {
        element = element.split(" ");
        element.forEach((element) => {
            document.getElementById(element).addEventListener(event, (e) => {
                callback(e);
            })
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