import React, {useState} from "react"
import {graphql} from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col
} from 'reactstrap';
import "../assets/css/bootstrap.min.css"
import ReactHtmlParser from 'react-html-parser'

export default({data}) => {
  const [activeTab, setActiveTab] = useState(1);

  const toggle = tab => {
    if (activeTab !== tab)
      setActiveTab(tab);
    }
  console.log(data)
  return (<Layout>
    <SEO title={data.wordpressCategory.name} description={data.wordpressCategory.description}/>
    <div className="container-fluid mt-2 px-3">
      <Row className="no-gutters align-items-center">
        <div className="col-sm-1 px-3">
          <img alt={data.wordpressCategory.acf.cat_image.alt_text} src={data.wordpressCategory.acf.cat_image.localFile.publicURL} className="img-fluid" />
        </div>
        <div className="col">
          <h1 className="mb-0">{data.wordpressCategory.name}</h1>
        </div>
      </Row>
    </div>
    <Row className="no-gutters">
      <div className="col-md-4 p-3">
        <Nav pills={true} className="flex-column text-left">
          {
            data.allWordpressPost.edges.map(({
              node
            }, index) => (<NavItem key={index}>
              <NavLink className={(
                  activeTab === index + 1)
                  ? 'nav-link rounded-0 active'
                  : 'nav-link rounded-0'} onClick={() => {
                  toggle(index + 1);
                }}>
                {ReactHtmlParser(node.title)}
              </NavLink>
            </NavItem>))
          }
        </Nav>
      </div>
      <div className="col-md-8 p-3">
        <TabContent activeTab={activeTab}>
          {
            data.allWordpressPost.edges.map(({
              node
            }, index) => (<TabPane tabId={index + 1} key={index}>
              <Row>
                <Col sm="12">
                  <h2 className="h2">{ReactHtmlParser(node.title)}</h2>
                  <p>
                    By:
                    <span className="text-info">
                      {node.author.name}</span>&nbsp; on &nbsp;
                    <span className="text-dark">{node.date}</span>
                  </p>
                  <p>In
                    <span className="text-info">{node.categories[0].name}
                    </span>
                  </p>
                  <div>{ReactHtmlParser(node.content)}</div>
                </Col>
              </Row>
            </TabPane>))
          }
        </TabContent>
      </div>
    </Row>
  </Layout>)
}

export const pageQuery = graphql `
query ($id: Int!) {
  allWordpressPost(filter: {categories: {elemMatch: {wordpress_id: {eq: $id}}}}) {
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
          wordpress_parent
        }
      }
    }
  }
  wordpressCategory(wordpress_id: {eq: $id}) {
    acf {
      cat_image {
        localFile {
          publicURL
        }
      }
    }
    name
  }
}
`
