document.getElementById("download-likes").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]) {
            chrome.tabs.sendMessage(tabs[0].id, { type: "start_likes_download" });
            document.getElementById("status-text").innerText = "Starting likes audio backup...";
        }
    });
});

document.getElementById("download-following").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]) {
            chrome.tabs.sendMessage(tabs[0].id, { type: "start_following_download" });
            document.getElementById("status-text").innerText = "Starting following audio backup...";
        }
    });
});