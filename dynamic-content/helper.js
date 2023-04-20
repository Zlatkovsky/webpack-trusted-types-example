export function addColoredSquareToDiv(parentElement) {
  const child = document.createElement("div");
  child.style.width = "300px";
  child.style.height = "300px";
  child.style.background = getRandomColor();

  parentElement.appendChild(child);
}

// Taken from https://stackoverflow.com/a/1484514
function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
