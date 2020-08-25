Object.keys(gameList).forEach((e) => {
  let button = createButton(gameList[e], () => {window.location.href = "/lobby/" + e});
  document.getElementById("game-list").appendChild(button);
})

function createButton(name, callback){
  let button = document.createElement("button");
  button.innerHTML = name;
  button.addEventListener('click' , callback);
  return button;
}

