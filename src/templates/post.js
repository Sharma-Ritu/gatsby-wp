import React from "react"
import {graphql} from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import "../assets/css/bootstrap.min.css"
import ReactHtmlParser from 'react-html-parser'

export default ({ data }) => {
  console.log( data )
  const post = data.wordpressPost
    return (
		<Layout>
			<SEO title="post" />
			<div className="container">
				<div className="row">
	 				<div className="col-md-12">
						<h1>{ReactHtmlParser(post.title)}</h1>
						<p> By:
							<span className="text-info"> {post.author.name}</span>
							 on &nbsp;
							<span className="text-dark">{post.date}</span>
						</p>
						<div>{ReactHtmlParser(post.content)}</div>
					</div>
				</div>
			</div>
		</Layout>
	)
}
export const pageQuery = graphql`
query pageQuery($id: Int!) {
  wordpressPost(wordpress_id: {eq: $id}) {
    title
    content
    slug
    wordpress_id
    date(formatString: "MM-DD-YYYY")
    categories {
		slug
	}
    author {
      name
    }
  }
}
`
