document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search");
  const resultsElement = document.getElementById("results");

  let currentIndex = -1;
  let results = [];
  let allTabs = [];

  searchInput.focus();

  // Fetch all tabs
  chrome.tabs.query({}, (tabs) => {
    allTabs = tabs.map((tab) => ({
      id: tab.id,
      title: tab.title,
      url: tab.url,
      favIconUrl: tab.favIconUrl || "default-icon.png", // Use a fallback if no favicon
    }));

    displayResults(allTabs);

    // Filter tabs based on input
    searchInput.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase();
      resultsElement.innerHTML = "";

      results = allTabs.filter(
        (tab) =>
          tab.title.toLowerCase().includes(query) ||
          tab.url.toLowerCase().includes(query),
      );

      currentIndex = results.length > 0 ? 0 : -1;
      displayResults(results);
    });

    // Navigate and select tabs using the keyboard
    searchInput.addEventListener("keydown", (e) => {
      const listItems = resultsElement.querySelectorAll("li");

      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (currentIndex < listItems.length - 1) {
          listItems[currentIndex].classList.remove("highlight");
          currentIndex++;
          listItems[currentIndex].classList.add("highlight");
          listItems[currentIndex].scrollIntoView({ block: "nearest" });
        }
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        if (currentIndex > 0) {
          listItems[currentIndex].classList.remove("highlight");
          currentIndex--;
          listItems[currentIndex].classList.add("highlight");
          listItems[currentIndex].scrollIntoView({ block: "nearest" });
        }
      }

      if (e.key === "Enter" && currentIndex >= 0) {
        const selectedTab = results[currentIndex];
        chrome.tabs.update(selectedTab.id, { active: true });
      }
    });
  });

  // Display results in the dropdown
  function displayResults(tabs) {
    resultsElement.innerHTML = "";
    results = tabs;

    tabs.forEach((tab, index) => {
      const li = document.createElement("li");
      li.dataset.index = index;

      // Add favicon and title
      const favicon = document.createElement("img");
      favicon.src = tab.favIconUrl;
      favicon.alt = "favicon";
      favicon.className = "favicon";

      const title = document.createElement("span");
      title.textContent = tab.title;

      li.appendChild(favicon);
      li.appendChild(title);

      if (index === currentIndex) {
        li.classList.add("highlight");
      }

      li.addEventListener("click", () => {
        chrome.tabs.update(tab.id, { active: true });
      });

      resultsElement.appendChild(li);
    });
  }
});
