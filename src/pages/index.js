import React, { useState } from "react"
import {Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import {Row, Card, CardBody, Collapse} from 'reactstrap'
import ReactHtmlParser from 'react-html-parser'
import "../assets/css/style.css"
import final_img from "../assets/img/Final_Homepage1.png"

export default ({ data }) => {
  const [collapse, setCollapse] = useState(0);
  const toggle = (event) => {
    const activeBlock = parseInt(event.target.dataset.event)
    if(activeBlock===collapse){
      setCollapse(0)
    }else{
      setCollapse(parseInt(event.target.dataset.event))
    }
    console.log(collapse, activeBlock)
  };
  const rootCatLoop = data.allWordpressCategory.nodes
  const subCatLoop = data.allWordpressCategory.nodes
  let catData = [];
  rootCatLoop.map((root, index) => {
      if(root.wordpress_parent === 0){
          let i = catData.push(root)
          catData[i-1].childs = []
          subCatLoop.map((child, innerIndex) => {
              if(child.wordpress_parent === root.wordpress_id){
                  catData[i-1].childs.push(child)
              }
              return true
          })
      }
      return true
  })
  return (
        <Layout>
            <SEO title={data.wordpressPage.title} />
                <Row className="no-gutters">
                    <div className="col-md-4 p-3 border">
                      <div id="accordion">
                        {catData.map((root, index) => (
                            <Card key={root.wordpress_id} className="border-0">
                                <button
                                  onClick={toggle}
                                  data-event={index+1}
                                  className="bg-transparent border-0 p-2 text-left outline-none toggle-block"
                                >
                                  {ReactHtmlParser(root.name)}
                                </button>
                                <Collapse isOpen={collapse === index+1}>
                                  <CardBody>
                                    <Row>
                                        {root.childs.map((child,innerIndex)=>(
                                           <div key={child.wordpress_id} className="col-6">
                                                <Card className="mb-3 text-center">
                                                    <CardBody className="px-0">
                                                      <div className="mx-2 px-5">
                                                        <img alt={child.acf.cat_image.alt_text} src={child.acf.cat_image.localFile.publicURL} className="img-fluid" />
                                                      </div>
                                                      <Link to={`/category/${child.slug}`} className="stretched-link">
                                                        {ReactHtmlParser(child.name)}
                                                      </Link>
                                                    </CardBody>
                                                </Card>
                                            </div>
                                        ))}
                                    </Row>
                                  </CardBody>
                                </Collapse>
                            </Card>
                        ))}
                      </div>
                    </div>
                    <div className="col-md-8 bg-dark">
                        <img className="img-fluid" src={final_img} alt="" />
                    </div>
                </Row>
        </Layout>
    )
}

export const pageQuery = graphql`
query {
  allWordpressCategory(filter: {slug: {ne: "uncategorized"}}) {
    nodes {
      acf {
        cat_image {
          localFile {
            publicURL
          }
        }
      }
      name
      slug
      wordpress_id
      wordpress_parent
      parent_element {
        name
        slug
        wordpress_id
        wordpress_parent
      }
    }
  }
  wordpressPage(path: {eq: "/private_lectures/"}) {
    title
  }
}
`
