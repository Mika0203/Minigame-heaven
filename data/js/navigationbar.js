(function(){
    AddEvent("navigation-game", "click", () => {
        location.href = '/lobby'
    })

    AddEvent("navigation-forum", "click", () => {
        location.href = '/forum'
    })

})();