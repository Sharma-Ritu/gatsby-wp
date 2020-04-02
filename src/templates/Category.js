import React, { useState } from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import {TabContent, TabPane, Nav, NavItem, NavLink, Container, Row, Col} from 'reactstrap';
import "../assets/css/bootstrap.min.css"

export default ({ data }) => {
    const [activeTab, setActiveTab] = useState(1);

    const toggle = tab => {
        if(activeTab !== tab) setActiveTab(tab);
    }
  console.log( data )
  return (
    <Layout>
        <SEO title="post" />
            <Container>
                <Row>
                    <div className="col-md-4"> 
                        <Nav pills className="flex-column text-left">
                            {data.allWordpressPost.edges.map(({ node }, index) => (
                                <NavItem key={index}> 
                                  <NavLink
                                    className={(activeTab === index+1)?'nav-link rounded-0 active':'nav-link rounded-0'}
                                    onClick={() => { toggle(index+1); }}>
                                        {node.title}
                                  </NavLink>
                                </NavItem>
                            ))}
                        </Nav>
                    </div>
                    <div className="col-md-8">
                        <TabContent activeTab={activeTab}>
                            {data.allWordpressPost.edges.map(({ node }, index) => (
                                <TabPane tabId={index+1} key={index}>
                                    <Row>
                                        <Col sm="12">
                                            <h1 dangerouslySetInnerHTML={{ __html: node.title }} />
                                            <p> By: 
                                                <span className="text-info"> {node.author.name}</span>&nbsp;
                                                 on &nbsp;  
                                                <span className="text-dark">{node.date}</span>
                                            </p>
                                            <p>In <span className="text-info">{node.categories[0].name} </span></p>
                                            <div dangerouslySetInnerHTML={{ __html: node.content }} /> 
                                        </Col>
                                    </Row>
                                </TabPane>
                            ))}
                        </TabContent>
                    </div>
                </Row>
            </Container>
    </Layout>
  )
}

export const pageQuery = graphql`
  query($id: Int!) {
    allWordpressPost(filter: {categories: {elemMatch: {wordpress_id: { eq: $id } }}}) {
        edges {
            node {
                slug
                title
                content
                excerpt
                wordpress_id
                date(formatString: "MM-DD-YYYY")
                author {
                    name
                }
                categories {
                    wordpress_id
                    name
                }
            }
        }
    }
}
`