(function(){
    AddEvent("navigation-game", "click", () => {
        location.href = '/lobby'
    })

    AddEvent("navigation-board", "click", () => {
        location.href = '/board'
    })

})();