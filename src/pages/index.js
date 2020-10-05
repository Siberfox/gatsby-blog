import React from "react"
import { graphql, Link } from "gatsby"
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogLink = styled(Link)`
  text-decoration: none;
`

const BlogTitle = styled.h3`
  color: #9e0d0d;
`
const Article = styled.div`
  margin-bottom: 50px;
`

export default ({ data }) => {
  return (
    <Layout>
      <SEO title="Home" />
      <div>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <Article key={node.id}>
            <BlogLink to={node.fields.slug}>
              <BlogTitle>
                <span>{node.frontmatter.title}</span>
              </BlogTitle>
            </BlogLink>
            <h5>
              {new Date(node.frontmatter.date).toLocaleString("en-En", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </h5>
            <p>{node.excerpt}</p>
          </Article>
        ))}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            date
            description
            title
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`
