document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search");
  const resultsElement = document.getElementById("results");

  let currentIndex = -1; // Track the currently highlighted index
  let results = []; // Store the filtered tab results
  let allTabs = []; // Store all tabs for initial display

  // Automatically focus the search input when the popup is loaded
  searchInput.focus();

  // Fetch all tabs
  chrome.tabs.query({}, (tabs) => {
    allTabs = tabs.map((tab) => ({
      id: tab.id,
      title: tab.title,
      url: tab.url,
    }));

    // Initially display all tabs
    displayResults(allTabs);

    searchInput.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase();
      resultsElement.innerHTML = "";
      currentIndex = -1; // Reset the highlight index

      results = allTabs.filter(
        (tab) =>
          tab.title.toLowerCase().includes(query) ||
          tab.url.toLowerCase().includes(query),
      );

      displayResults(results);
    });

    // Handle keyboard navigation
    searchInput.addEventListener("keydown", (e) => {
      const listItems = resultsElement.querySelectorAll("li");

      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (currentIndex < listItems.length - 1) {
          if (currentIndex >= 0)
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

  // Display the results in the UI
  function displayResults(tabs) {
    resultsElement.innerHTML = "";
    results = tabs;

    tabs.forEach((tab, index) => {
      const li = document.createElement("li");
      li.textContent = tab.title;
      li.dataset.index = index;

      // Handle click event
      li.addEventListener("click", () => {
        chrome.tabs.update(tab.id, { active: true });
      });

      resultsElement.appendChild(li);
    });
  }
});
