String.prototype.replaceAt = function(index, character) {
    return this.substr(0, index) + character + this.substr(index + character.length);
}

function removeRegex(string, re, checkBoundry = true) {
    var found = string.match(re);
    while (found != null && found.length != 0) {
        var index = string.indexOf(found[0])
            //most of the time the words looking for are in [],(),{},etc
            //so remove those if they are there
        if (checkBoundry) {
            if (string.charAt(index - 1) !== " ") {
                string = string.replaceAt(index - 1, " ");
            }
            if (string.charAt(index + found[0].length) !== " ") {
                string = string.replaceAt(index + found[0].length, " ");
            }
        }
        string = string.replace(re, "");
        string = string.replace("  ", " "); //replace double space with 1
        found = string.match(re);
    }
    return string;
}

chrome.extension.sendMessage({}, function(response) {
    var readyStateCheckInterval = setInterval(function() {
        if (document.readyState === "complete") {
            clearInterval(readyStateCheckInterval);



            var fileref = document.createElement("link")
            fileref.setAttribute("rel", "stylesheet")
            fileref.setAttribute("type", "text/css")
            fileref.setAttribute("href", "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.min.css")
            document.getElementsByTagName('head')[0].appendChild(fileref)

            var actionButtons = document.getElementById('watch8-secondary-actions');

            var btn = document.createElement("BUTTON");



            btn.id = "Google-Play-Music-Search"
            var img = document.createElement("img")
            img.src = chrome.extension.getURL("icons/button.png")
            img.setAttribute("height", "20");
            img.setAttribute("width", "20");
            //btn.appendChild(img);
            var t = document.createElement("span");
            // var t = document.createTextNode("Google Music Search");

            t.innerHTML = "Google Music Search"
            btn.class+="yt-uix-button-content";
            var myDiv = document.createElement("i");
            myDiv.id = "my-div"
            myDiv.className += " fa  fa-music"
            //t.nodeValue = "&#xf001"
            btn.appendChild(myDiv);

            btn.appendChild(t);
            btn.onclick = function() {
                var title = document.getElementById('eow-title').innerText;

                title = removeRegex(title, /Full Album/gi);
                title = removeRegex(title, /High Quality/gi);
                title = removeRegex(title, /Audio Stream/gi);
                title = removeRegex(title, /Music Video/gi);
                title = removeRegex(title, /[\[,(,{]HD[\],),}]/gi, false);
                var search = title.split(' ').join('+');
                //console.log("search:"+search);
                var my_url = "https://play.google.com/music/listen?u=0#/sr/" + search
                window.open(my_url, title);
                //chrome.runtime.sendMessage({url:my_url})
            };

            //Append the element in page (in span).
            actionButtons.appendChild(btn);

        }
    }, 10);
});
