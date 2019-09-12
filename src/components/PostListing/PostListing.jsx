import React from "react";
import _ from "lodash";
import { Link } from "gatsby";
import Image from "../Image/Image";
import "./Postlisting.css";

class PostListing extends React.Component {
  getPostList() {
    const postList = [];
    this.props.postEdges.forEach(postEdge => {
      postList.push({
        path: postEdge.node.fields.slug,
        category: postEdge.node.frontmatter.category,
        tags: postEdge.node.frontmatter.tags,
        cover: postEdge.node.frontmatter.cover,
        title: postEdge.node.frontmatter.title,
        date: postEdge.node.frontmatter.date,
        excerpt: postEdge.node.excerpt,
        timeToRead: postEdge.node.timeToRead
      });
    });
    return postList;
  }
  render() {
    const postList = this.getPostList();
    return (
      <div className="postlisting">
        {/* Your post list here. */
        postList.map(post => (
          <div className="post">
            <Link to={post.path} key={post.title}>
              <h2 className="post-title">{post.title}</h2>
              <span className="post-date">{post.date}</span>
              <span className="post-category">{post.category}</span>
              <Image filename={post.cover} />
            </Link>
            {/* <Link
              key={post.category}
              to={`/categories/${_.kebabCase(post.category)}`}
            >
                <h3>{post.category}</h3>
            </Link> */}
          </div>
        ))}
      </div>
    );
  }
}

export default PostListing;
