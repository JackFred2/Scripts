// ==UserScript==
// @name         Wikipedia Equation Copier
// @version      0.2
// @description  Adds a button to copy equation LaTeX from wikipedia articles
// @author       JackFred
// @match        https://*.wikipedia.org/wiki/*
// @match        https://*.wikimedia.org/wiki/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var matches = document.getElementsByClassName("mwe-math-element");
    for (let i = 0; i < matches.length; i++) {
        var image = matches[i].getElementsByTagName("img")[0];
        if (image) {
            let latex = image.getAttribute("alt");
            let pBlock = document.createElement("p");
            let codeBlock = document.createElement("code");
            codeBlock.innerHTML = "Copy LaTeX";
            codeBlock.style = "cursor:pointer";
            pBlock.appendChild(codeBlock);
            let updateFunc = function () {
                let input = document.createElement("textarea");
                input.appendChild(document.createTextNode(latex));
                input.style.top = "0";
                input.style.left = "0";
                input.style.position = "fixed";
                document.body.appendChild(input);
                input.focus();
                input.select();
                var success = false;
                try {
                    success = document.execCommand("copy");
                } catch (err) {}
                document.body.removeChild(input);

                if (success) {
                    codeBlock.style.backgroundColor = "#99f270";
                    codeBlock.style.outline = "2px #309700 solid"
                    codeBlock.innerHTML = "Success";
                    setTimeout(function() {
                        codeBlock.style.backgroundColor = null;
                        codeBlock.style.outline = null;
                        codeBlock.innerHTML = "Copy LaTeX";
                    }, 500);
                }

            };
            codeBlock.addEventListener("click", updateFunc);
            matches[i].appendChild(pBlock);
        }
    }
})();
