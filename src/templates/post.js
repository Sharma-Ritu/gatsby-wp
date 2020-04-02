import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import {Container, Row, Col} from 'reactstrap';
import "../assets/css/bootstrap.min.css"

export default ({ data }) => {
  console.log( data )
  const post = data.wordpressPost

    return (
		<Layout>
			<SEO title="post" />
			<div className="container">
				<div className="row">
					<div className="col-md-4">
					
						<ul className="list-group p-2">
							<li className="list-group-item p-3">
			                    <Link to={`/category/english`}>English</Link>
			                </li>
			                <li className="list-group-item p-3">
			                    <Link to={`/category/bank-gk`}>Bank GK</Link>
			                </li>
			                <li className="list-group-item p-3">
			                    <Link to={`/category/mathematics`}>Mathematics</Link>
			                </li>
			                <li className="list-group-item p-3">
			                    <Link to={`/category/general-knowledge`}>General Knowledge</Link>
			                </li>
              			</ul>
					</div>
	 				<div className="col-md-8">
						<h1 dangerouslySetInnerHTML={{ __html: post.title }} />
						<p> By: 
							<span className="text-info"> {post.author.name}</span>
							 on &nbsp; 
							<span className="text-dark">{post.date}</span>
						</p>
						<div dangerouslySetInnerHTML={{ __html: post.content }} />
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

/*
$cat_id: Int!
allWordpressPost(filter: {categories: {elemMatch: {wordpress_id: {eq: $cat_id}}}}) {
    edges {
      node {
        slug
        title
        content
        wordpress_id
        date(formatString: "MM-DD-YYYY")
        author {
          name
        }
      }
    }
  }
*/