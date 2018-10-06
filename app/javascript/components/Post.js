import React from "react"
import PropTypes from "prop-types"
class Post extends React.Component {
  render () {
    return <h1>{this.props.title}</h1>
  }
}

Post.propTypes = {
  title: PropTypes.string
};
export default Post
