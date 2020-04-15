module.exports = {
  siteMetadata: {
    title: `Private Lectures`,
    description: `Private Lectures lessons`,
    author: `@innovagesoftwares`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
    	resolve: `gatsby-source-wordpress`,
        options: {
            excludedRoutes: [
              "**/settings",
              "**/yoast/v1/configurator",
              "**/yoast/v1/reindex_posts",
              "**/yoast/v1/file_size",
              "**/yoast/v1/statistics",
              "**/yoast/v1/myyoast/connect",
              "**/wp-graphql-gutenberg/v1/editor-posts",
              "**/wp/v2/users/me",
              "**/wp/v2/themes"
            ],
            // Specify the URL of the WordPress source
            baseUrl: `innovagesoftwares.com/private_lectures`,
            protocol: `https`,
            // Indicates if a site is hosted on WordPress.com
            hostingWPCOM: false,
            useACF: true,
            // searchAndReplaceContentUrls: {
            //   sourceUrl: "http://localhost/private-lectures/",
            //   replacementUrl: "",
            // },
        }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
