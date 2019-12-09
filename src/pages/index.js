import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import Layout from "../components/layout"

const IndexPage = ({ data }) => (
  <Layout>
    <h1>Hi my people</h1>
    <p>Welcome to my new Gatsby page</p>
    <p>Now we can see my page</p>
    <ul>
      {data.allStrapiArticle.edges.map(document => (
        <h2>
          <Link to={`/${document.node.id}`}>
            {document.node.title}
          </Link>
          <Img fluid={document.node.image.childImageSharp.fluid}/>
          <p>{document.node.content}</p>
        </h2>
      ))}
    </ul>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)

export default IndexPage


export const pageQuery = graphql`
  query IndexQuery {
    allStrapiArticle {
      edges {
        node {
          id
          title
          content
          image {
            childImageSharp {
              fluid(maxWidth:600) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
` 