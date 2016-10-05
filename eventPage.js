/*This file is not used in the actual extension
  Tried to us the eventpage to load the url in a tab with google music
  but it would cut off music that was playing and still reload the whole page
  so just stuck with window.open in the injected js script
*/
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        chrome.tabs.query({
            url: "*://play.google.com/music/listen*"
        }, function(tabs) {
          console.log("tabs:" + tabs);
            if (tabs.length > 0) {
                chrome.tabs.update(tabs[0].id, {
                    url: request.url
                });
            } else {
                chrome.tabs.create({
                    url: request.url
                });
            }
        })
    });
