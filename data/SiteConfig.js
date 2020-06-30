const config = {
  siteTitle: "YopiNoji.com", // Site title.
  siteTitleShort: "YopiNoji.com", // Short site title for homescreen (PWA). Preferably should be under 12 characters to prevent truncation.
  siteTitleAlt: "YopiNoji.com", // Alternative site title for SEO.
  siteLogo: "/logos/logo.png", // Logo used for SEO and manifest.
  siteUrl: "https://yopinoji.com", // Domain of your website without pathPrefix.
  siteDescription:
    "よぴのじの個人ブログ。プログラミングや技術など興味のある分野について書いています。", // Website description used for RSS feeds/meta description tag.
  siteRss: "/rss.xml", // Path to the RSS file.
  siteFBAppID: "", // FB Application ID for using app insights
  googleAnalyticsID: "UA-131756589-2", // GA tracking ID.
  postDefaultCategoryID: "Tech", // Default category for posts.
  dateFromFormat: "YYYY-MM-DD", // Date format used in the frontmatter.
  dateFormat: "YYYY-MM-DD", // Date format for display.
  userName: "YopiNoji", // Username to display in the author segment.
  userEmail: "yopinoji@gmail.com", // Email used for RSS feed's author segment
  userTwitter: "YopiNoji", // Optionally renders "Follow Me" in the UserInfo segment.
  userLocation: "Tokyo, Japan", // User location to display in the author segment.
  userAvatar: "https://api.adorable.io/avatars/150/test.png", // User avatar to display in the author segment.
  userDescription: "", // User description to display in the author segment.
  // Links to social profiles/projects you want to display in the author segment/navigation bar.
  userLinks: [
    {
      label: "GitHub",
      url: "https://github.com/YopiNoji",
      iconClassName: "fa fa-github"
    },
    {
      label: "Twitter",
      url: "https://twitter.com/YopiNoji",
      iconClassName: "fa fa-twitter"
    },
    {
      label: "Email",
      url: "mailto:yopinoji@gmail.com",
      iconClassName: "fa fa-envelope"
    }
  ],
  copyright: "Copyright © 2019 YopiNoji", // Copyright string for the footer of the website and RSS feed.
  themeColor: "#c62828", // Used for setting manifest and progress theme colors.
  backgroundColor: "#e0e0e0" // Used for setting manifest background color.
};

// Validate

// Make sure siteUrl doesn't have an ending forward slash
if (config.siteUrl.substr(-1) === "/")
  config.siteUrl = config.siteUrl.slice(0, -1);

// Make sure siteRss has a starting forward slash
if (config.siteRss && config.siteRss[0] !== "/")
  config.siteRss = `/${config.siteRss}`;

module.exports = config;
