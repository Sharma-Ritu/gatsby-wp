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
            // Specify the URL of the WordPress source
            baseUrl: `innovagesoftwares.com/private_lectures`,
            protocol: `http`,
            // Indicates if a site is hosted on WordPress.com
            hostingWPCOM: false,
            // Specify which URL structures to fetch
            includedRoutes: [
              "**/categories",
		      "**/posts",
		      "**/pages",
		      "**/media",
		      "**/tags",
		      "**/taxonomies",
		      "**/users",
            ]
        }
    }
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
