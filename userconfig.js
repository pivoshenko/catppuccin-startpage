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
      name: "myself",
      background_url: "src/img/banners/cbg-9.gif",
      categories: [
        {
          name: "notes",
          links: [
            {
              name: "raindrop",
              url: "https://app.raindrop.io",
              icon: "droplet-bolt",
              icon_color: "#a6da95",
            },
            {
              name: "pocket",
              url: "https://getpocket.com",
              icon: "brand-pocket",
              icon_color: "#f5a97f",
            },
          ],
        },
        {
          name: "stuff",
          links: [
            {
              name: "gmail",
              url: "https://mail.google.com",
              icon: "brand-gmail",
              icon_color: "#a6da95",
            },
            {
              name: "calendar",
              url: "https://calendar.google.com",
              icon: "calendar-filled",
              icon_color: "#f5a97f",
            },
            {
              name: "xtiles",
              url: "https://xtiles.app/workspace/personal",
              icon: "clipboard-check",
              icon_color: "#ed8796",
            },
          ],
        },
        {
          name: "news",
          links: [
            {
              name: "ґрунт",
              url: "https://grnt.media",
              icon: "eye-search",
              icon_color: "#a6da95",
            },
            {
              name: "уп",
              url: "https://www.pravda.com.ua",
              icon: "news",
              icon_color: "#f5a97f",
            },
            {
              name: "mil.in.ua",
              url: "https://mil.in.ua/uk/",
              icon: "badge-filled",
              icon_color: "#ed8796",
            },
          ],
        },
      ],
    },
    {
      name: "dev",
      background_url: "src/img/banners/cbg-8.gif",
      categories: [
        {
          name: "resources",
          links: [
            {
              name: "github",
              url: "https://github.com/",
              icon: "brand-github",
              icon_color: "#a6da95",
            },
            {
              name: "neptune",
              url: "https://ui.neptune.ai",
              icon: "circle-triangle",
              icon_color: "#f5a97f",
            },
            {
              name: "musicForProgramming();",
              url: "https://musicforprogramming.net/sixty/",
              icon: "binary-tree",
              icon_color: "#ed8796",
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
              name: "stackoverflow",
              url: "https://stackoverflow.com",
              icon: "brand-stackoverflow",
              icon_color: "#ed8796",
            },
            {
              name: "wakatime",
              url: "https://wakatime.com/dashboard",
              icon: "24-hours",
              icon_color: "#8bd5ca",
            },
          ],
        },
        {
          name: "blogs",
          links: [
            {
              name: "dou",
              url: "https://dou.ua",
              icon: "brand-prisma",
              icon_color: "#a6da95",
            },
            {
              name: "medium",
              url: "https://medium.com",
              icon: "brand-medium",
              icon_color: "#f5a97f",
            },
            {
              name: "uber",
              url: "https://eng.uber.com/category/articles",
              icon: "brand-uber",
              icon_color: "#ed8796",
            },
            {
              name: "hackernews",
              url: "https://news.ycombinator.com",
              icon: "brand-redhat",
              icon_color: "#8bd5ca",
            },
            {
              name: "reddit",
              url: "https://www.reddit.com",
              icon: "brand-reddit",
              icon_color: "#eed49f",
            },
          ],
        },
      ],
    },
    {
      name: "chi ll",
      background_url: "src/img/banners/cbg-12.gif",
      categories: [
        {
          name: "social medias",
          links: [
            {
              name: "telegram",
              url: "https://web.telegram.org",
              icon: "brand-telegram",
              icon_color: "#a6da95",
            },
            {
              name: "twitter",
              url: "https://twitter.com/volopivoshenko",
              icon: "brand-x",
              icon_color: "#f5a97f",
            },
            {
              name: "facebook",
              url: "https://www.facebook.com",
              icon: "brand-facebook",
              icon_color: "#ed8796",
            },
          ],
        },
        {
          name: "games",
          links: [
            {
              name: "steam",
              url: "https://store.steampowered.com",
              icon: "brand-steam",
              icon_color: "#a6da95",
            },
            {
              name: "epicgames",
              url: "https://store.epicgames.com",
              icon: "brand-fortnite",
              icon_color: "#f5a97f",
            },
            {
              name: "nintendo",
              url: "https://store.nintendo.co.uk",
              icon: "device-nintendo",
              icon_color: "#ed8796",
            },
          ],
        },
        {
          name: "video",
          links: [
            {
              name: "youtube",
              url: "https://www.youtube.com",
              icon: "brand-youtube",
              icon_color: "#a6da95",
            },
            {
              name: "patreon",
              url: "https://www.patreon.com",
              icon: "brand-patreon",
              icon_color: "#f5a97f",
            },
            {
              name: "kyivstar",
              url: "https://tv.kyivstar.ua",
              icon: "star-filled",
              icon_color: "#ed8796",
            },
          ],
        },
      ],
    },
  ],
};

const CONFIG = new Config(saved_config ?? default_config);
// const CONFIG = new Config(default_config);
