document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search");
  const resultsElement = document.getElementById("results");

  let currentIndex = -1;
  let results = [];
  let allTabs = [];

  searchInput.focus();

  chrome.tabs.query({}, (tabs) => {
    allTabs = tabs.map((tab) => ({
      id: tab.id,
      title: tab.title,
      url: tab.url,
    }));

    displayResults(allTabs);

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

  function displayResults(tabs) {
    resultsElement.innerHTML = "";
    results = tabs;

    // Show initial tabs without highlighting if no search has been performed
    if (currentIndex === -1) {
      tabs.forEach((tab, index) => {
        const li = document.createElement("li");
        li.textContent = tab.title;
        li.dataset.index = index;

        li.addEventListener("click", () => {
          chrome.tabs.update(tab.id, { active: true });
        });

        resultsElement.appendChild(li);
      });
    } else {
      // Show search results with highlighting
      tabs.forEach((tab, index) => {
        const li = document.createElement("li");
        li.textContent = tab.title;
        li.dataset.index = index;

        if (index === currentIndex) {
          li.classList.add("highlight");
        }

        li.addEventListener("click", () => {
          chrome.tabs.update(tab.id, { active: true });
        });

        resultsElement.appendChild(li);
      });
    }
  }
});
