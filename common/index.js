const resultDiv = document.getElementById("result");

window.addEventListener("error", (event) => {
  console.error(event);
  resultDiv.innerText = "Uncaught error\n" + event.message;
});

const policy = window.trustedTypes.createPolicy("host-app-policy", {
  createScriptURL: (url) => url,
});

document.getElementById("load-no-policy").onclick = () => {
  performDynamicLoad("../dist/dynamic-content/no-policy/main.js");
};

document.getElementById("load-with-policy-name").onclick = () => {
  performDynamicLoad("../dist/dynamic-content/regular-trusted-types-policy/main.js");
};

function performDynamicLoad(dynamicUrlToLoad) {
  // Clear previous result
  document.getElementById("result").textContent = "";

  const dynamicScript = document.createElement("script");
  dynamicScript.setAttribute("src", policy.createScriptURL(dynamicUrlToLoad));
  document.head.appendChild(dynamicScript);
}
