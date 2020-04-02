const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions, reporter }) => {

const { createPage } = actions

const BlogPostTemplate = path.resolve("./src/templates/post.js")

const BlogCategoryTemplate = path.resolve("./src/templates/Category.js")

const result = await graphql(`
{
  allWordpressPost {
    nodes {
      slug
      wordpress_id
      categories {
        wordpress_id
      }
    }
  }
  allWordpressCategory(filter: {slug: {ne: "uncategorize"}}) {
    nodes {
      slug
      wordpress_id
    }
  }
}
`)

if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
}

const BlogPosts = result.data.allWordpressPost.nodes
const BlogCategories = result.data.allWordpressCategory.nodes



BlogPosts.forEach(post => {
    createPage({
        path: `/post/${post.slug}`,
        component: BlogPostTemplate,
        context: {
        	id: post.wordpress_id,
        	/*cat_id: post.categories.wordpress_id*/
        }
    })
})

BlogCategories.forEach(category => {
	createPage({
        path: `/category/${category.slug}`,
        component: BlogCategoryTemplate,
        context: {
            id: category.wordpress_id
        }
    })
})
}