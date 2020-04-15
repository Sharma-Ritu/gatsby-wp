import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404 Page Not found" />
    <div className="container-fluid text-center">
      <h1 className="font-10x my-5">404</h1>
      <h2 className="font-4x my-5">PAGE NOT FOUND</h2>
      <p className="mb-4">You just hit a route that doesn&#39;t exist... the sadness.</p>
    </div>
  </Layout>
)

export default NotFoundPage
