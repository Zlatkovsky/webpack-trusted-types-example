(() => {
  const resultDiv = document.getElementById("result");

  window.addEventListener("error", (event) => {
    console.error(event);
    resultDiv.innerText = "Uncaught error\n" + event.message;
  });

  const policy = window.trustedTypes.createPolicy("host-app-policy", {
    createScriptURL: (url) => url,
  });

  document.getElementById("load-code-with-no-policy").onclick = () => {
    performDynamicLoad("../dynamic-content/no-policy/main.js");
  };

  document.getElementById("load-code-with-policy-name-only").onclick = () => {
    performDynamicLoad(
      "../dynamic-content/trusted-types-policy-regular/main.js"
    );
  };

  document.getElementById(
    "load-code-with-continue-on-policy-creation-failure"
  ).onclick = () => {
    performDynamicLoad(
      "../dynamic-content/trusted-types-policy-continue-on-error/main.js"
    );
  };

  function performDynamicLoad(dynamicUrlToLoad) {
    // Clear previous result
    document.getElementById("result").textContent = "";

    const dynamicScript = document.createElement("script");
    dynamicScript.setAttribute("src", policy.createScriptURL(dynamicUrlToLoad));
    document.head.appendChild(dynamicScript);
  }
})();
