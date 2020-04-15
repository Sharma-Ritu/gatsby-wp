import React from "react"
import { graphql } from "gatsby"
//import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogPostTemplate = ({ data }) => {
    const postData = data.wordpressPost


    /*if (postData.featured_media) {
        featuredImg = postData.featured_media.localFile.childImageSharp.fixed
    }*/

    return (
        <Layout>
            <SEO title={postData.title} description={postData.excerpt} />

            <h3 style={{ fontSize: 33, marginTop:0 }} dangerouslySetInnerHTML={{ __html: postData.title }} />
            <div dangerouslySetInnerHTML={{ __html: postData.content }} />
        </Layout>
    )
}
export default BlogPostTemplate

export const query = graphql`
query ($id: Int!) {
  wordpressPost(wordpress_id: {eq: $id}) {
    title
    content
    excerpt
    date(formatString: "MMMM DD, YYYY")
    author {
      name
    }
  }
}
`
