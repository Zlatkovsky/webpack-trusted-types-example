(() => {
  const resultDiv = document.getElementById("result");
  import("./helper.js")
    .then((module) => module.addColoredSquareToDiv(resultDiv))
    .catch((e) => {
      resultDiv.innerText = "Error:\n" + e;
    });
})();
