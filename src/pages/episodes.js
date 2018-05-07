import React from "react";
import PropTypes from "prop-types";
import Link from "gatsby-link";
//the real one

export default class EpisodesPage extends React.Component {
  render() {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;

    return (
      <div>
        <section className="section">
          <div className="container">
            <div className="content">
              <h1 className="has-text-weight-bold is-size-2">Latest Episodes</h1>
            </div>
            {posts
              .filter((post) => post.node.frontmatter.templateKey === "episode-post")
              .map(({ node: post }) => (
                <div
                  className="episode"
                  style={{
                    border: "1px solid #eaecee",
                    padding: "2em 4em",
                    margin: "2rem auto"
                  }}
                  key={post.id}
                >
                  <div className="outer">
                    <svg viewBox="0 0 140 140" preserveAspectRatio="xMidYMin meet">
                      {/* <defs>
                          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" style="stop-color:rgb(255,255,0);stop-opacity:1" />
                            <stop offset="100%" style="stop-color:rgb(255,0,0);stop-opacity:1" />
                          </linearGradient>
                        </defs> */}
                      <g>
                        <circle
                          r="50%"
                          cx="50%"
                          cy="50%"
                          className="circle-back"
                          fill="url(#grad1)"
                        />
                        <text x="50%" y="50%" textAnchor="middle" dy="0.3em">
                          E99
                        </text>
                      </g>
                    </svg>
                    <span className="episodeDate">{post.frontmatter.date}</span>
                  </div>
                  {/* <div className="episodeNumContainer">
                      <div className="episodeNum">E001</div>
                      <span className="episodeDate">{post.frontmatter.date}</span>
                    </div>
                      */}
                  <div className="episodeContentContainer">
                    <p>
                      <Link
                        className="has-text-primary has-text-bold is-size-4"
                        to={post.fields.slug}
                      >
                        {post.frontmatter.title}
                      </Link>
                    </p>
                    <p className="is-clearfix episodeContent">
                      {post.frontmatter.description}
                      <br />
                      <br />
                      <Link className="listenBtn is-pulled-right " to={post.fields.slug}>
                        ▶ Listen
                      </Link>
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </section>
      </div>
    );
  }
}

EpisodesPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array
    })
  })
};

export const pageQuery = graphql`
  query EpisodesQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            date(formatString: "MMMM DD, YYYY")
            description
          }
        }
      }
    }
  }
`;
