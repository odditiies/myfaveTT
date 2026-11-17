document.getElementById("download-likes").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]) {
            chrome.tabs.sendMessage(tabs[0].id, { type: "start_likes" });
            document.getElementById("status-text").innerText = "Status: Scanning liked audios...";
        }
    });
});

document.getElementById("download-following").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]) {
            chrome.tabs.sendMessage(tabs[0].id, { type: "start_following" });
            document.getElementById("status-text").innerText = "Status: Scanning followed audios...";
        }
    });
});

// Listen for progress updates sent from s.js
chrome.runtime.onMessage.addListener((message) => {
    if (message.type === "progress_update") {
        document.getElementById("progress-text").innerText = `Found: ${message.found} | Downloaded: ${message.downloaded}`;
        if (message.status) {
            document.getElementById("status-text").innerText = `Status: ${message.status}`;
        }
    }
});