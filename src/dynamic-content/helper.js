export function addColoredSquareToDiv(parentElement) {
  const mainDiv = document.createElement("div");
  mainDiv.style.width = "300px";
  mainDiv.style.height = "300px";
  mainDiv.style.lineHeight = "300px";
  mainDiv.style.textAlign = "center";
  mainDiv.style.background = getRandomColor();

  const spanWithin = document.createElement("span");
  spanWithin.textContent = "Dynamic code loaded!";
  spanWithin.style.background = "#85e485";
  spanWithin.style.padding = "0.5em 1em";
  mainDiv.appendChild(spanWithin);

  parentElement.appendChild(mainDiv);
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
