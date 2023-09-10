let saved_config = JSON.parse(localStorage.getItem("CONFIG"));

const default_config = {
  overrideStorage: true,
  temperature: {
    location: "London",
    scale: "C",
  },
  clock: {
    format: "h:i p",
    iconColor: "#ed8796",
  },
  search: {
    engines: {
      g: ["https://google.com/search?q=", "Google"],
      d: ["https://duckduckgo.com/html?q=", "DuckDuckGo"],
    },
  },
  keybindings: {
    s: "search-bar",
    // q: "config-tab",
  },
  disabled: [],
  fastlink: "https://app.raindrop.io",
  openLastVisitedTab: true,
  tabs: [
    {
      name: "dev",
      background_url: "src/img/banners/cbg-8.gif",
      categories: [
        {
          name: "repositories",
          links: [
            {
              name: "github",
              url: "https://github.com/",
              icon: "brand-github",
              icon_color: "#a6da95",
            },
            {
              name: "gitlab",
              url: "https://gitlab.com/",
              icon: "brand-gitlab",
              icon_color: "#f5a97f",
            },
          ],
        },
        {
          name: "resources",
          links: [
            {
              name: "vscode",
              url: "https://vscode.dev",
              icon: "brand-vscode",
              icon_color: "#a6da95",
            },
          ],
        },
        {
          name: "challenges",
          links: [
            {
              name: "kaggle",
              url: "https://www.kaggle.com/volodymyrpivoshenko",
              icon: "brain",
              icon_color: "#a6da95",
            },
            {
              name: "leetcode",
              url: "https://leetcode.com/",
              icon: "code-plus",
              icon_color: "#f5a97f",
            },
            {
              name: "tryhackme",
              url: "https://tryhackme.com/dashboard",
              icon: "brand-onedrive",
              icon_color: "#ea6962",
            },
            {
              name: "hackerrank",
              url: "https://www.hackerrank.com/dashboard",
              icon: "code-asterix",
              icon_color: "#a9b665",
            },
          ],
        },
      ],
    },
  ],
};

const CONFIG = new Config(saved_config ?? default_config);
// const CONFIG = new Config(default_config);
