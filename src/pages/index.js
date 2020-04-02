import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import {Container, Row, Col} from 'reactstrap';
import "../assets/css/bootstrap.min.css"

export default ({ data }) => {
  return (
    <Layout>
      <SEO title="home" />
      <h1>Learning Resource</h1>
      <Container>
        <Row>
        {data.allWordpressCategory.edges.map(({ node }) => (
          <Col sm="12" className="p-3 border mb-3" key={node.slug}>
            <Link to={`category/${node.slug}`}><h3>{node.name}</h3></Link>
            <p>{node.description}</p>  
            <p className="text-center"><Link to={`category/${node.slug}`} className="btn btn-primary text-center text-light">Go to Lessons</Link></p>
          </Col>
          ))}
        </Row>
      </Container>
    </Layout>
  )
}
export const pageQuery = graphql`
  query {
    allWordpressCategory(filter: {slug: {ne: "uncategorize"}}) {
      edges {
        node {
          name
          slug
          description
          wordpress_id
        }
      }
    }
  }
`