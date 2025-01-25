chrome.runtime.onInstalled.addListener(() => {
  console.log("Fuzzy Tab Search installed!");
});

chrome.commands.onCommand.addListener((command) => {
  if (command === "fuzzy_search") {
    chrome.action.openPopup();
  }
});
