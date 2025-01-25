function fuzzySearchTabs(query, tabs, options = {}) {
  // Default options
  const defaultOptions = {
    threshold: 0.2, // Similarity threshold (0-1)
    caseSensitive: false,
  };

  // Merge default options with user-provided options
  const settings = { ...defaultOptions, ...options };

  // Normalize query based on case sensitivity
  const normalizedQuery = settings.caseSensitive ? query : query.toLowerCase();

  // Compute Levenshtein distance between two strings
  function levenshteinDistance(str1, str2) {
    const m = str1.length;
    const n = str2.length;
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

    // Initialize first row and column
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;

    // Fill the matrix
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (str1[i - 1] === str2[j - 1]) {
          dp[i][j] = dp[i - 1][j - 1];
        } else {
          dp[i][j] = Math.min(
            dp[i - 1][j] + 1, // Deletion
            dp[i][j - 1] + 1, // Insertion
            dp[i - 1][j - 1] + 1, // Substitution
          );
        }
      }
    }

    return dp[m][n];
  }

  // Compute similarity score
  function computeSimilarity(str1, str2) {
    const normalizedStr1 = settings.caseSensitive ? str1 : str1.toLowerCase();

    const distance = levenshteinDistance(normalizedStr1, str2);
    const maxLength = Math.max(normalizedStr1.length, str2.length);

    // Compute similarity as a ratio (1 - normalized distance)
    return 1 - distance / maxLength;
  }

  // Filter and sort items by similarity
  return tabs
    .map((tab) => ({
      tab,
      similarity:
        computeSimilarity(
          normalizedQuery,
          settings.caseSensitive ? tab.title : tab.title.toLowerCase(),
        ) +
        computeSimilarity(
          normalizedQuery,
          settings.caseSensitive ? tab.url : tab.url.toLowerCase(),
        ),
    }))
    .filter((result) => result.similarity >= settings.threshold)
    .sort((a, b) => b.similarity - a.similarity)
    .map((result) => result.tab);
}

const tabs = [
  { id: 1, title: "My name is jeff", url: "https://youtube.com/jeff" },
  { id: 2, title: "Epic Gaming Moments", url: "https://twitch.tv/gaming" },
  {
    id: 3,
    title: "How to Make Perfect Pizza",
    url: "https://cooking.recipes/pizza",
  },
  { id: 4, title: "Cute Cat Videos", url: "https://videos.com/cats" },
  { id: 5, title: "Weather Forecast", url: "https://weather.com/local" },
  { id: 6, title: "Learn JavaScript", url: "https://docs.js/tutorial" },
  { id: 7, title: "Breaking News", url: "https://news.com/latest" },
];

const results = fuzzySearchTabs("jaasc", tabs);
console.log(results);
