document.getElementById("download-likes").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]) {
            chrome.tabs.sendMessage(tabs[0].id, { type: "start_likes" }, (response) => {
                document.getElementById("status-text").innerText = "Please select your backup folder in the TikTok tab.";
            });
        }
    });
});

document.getElementById("download-following").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]) {
            chrome.tabs.sendMessage(tabs[0].id, { type: "start_following" }, (response) => {
                document.getElementById("status-text").innerText = "Please select your backup folder in the TikTok tab.";
            });
        }
    });
});