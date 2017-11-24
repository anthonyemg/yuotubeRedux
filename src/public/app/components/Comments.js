import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const propTypes = {
  selectedVideoComments: PropTypes.array.isRequired
};

class Comments extends React.Component {
  constructor(props) {
    super();
  }
  render() {
    return (
      <div className="comments-container">
        <div className="comments-title">Comments</div>
        {this.props.selectedVideoComments.map((comment, idx) => (
          <div className="comments-commentWrapper" key={idx}>
            <div className="comments-userImage">
              <img src={comment.snippet.topLevelComment.snippet.authorProfileImageUrl} />
            </div>
            <div className="comments-comment">
              <span className="comments-commentName">
                {comment.snippet.topLevelComment.snippet.authorDisplayName}
              </span>
              <span className="comments-commentText">
                {comment.snippet.topLevelComment.snippet.textDisplay}
              </span>
              <div className="comments-commentReply">
                <span>REPLY</span>
                <div
                  dangerouslySetInnerHTML={{
                    __html: comment.snippet.topLevelComment.snippet.likeCount
                  }}
                />
                <i className="fa fa-thumbs-up fa-lg" />
                <i className="fa fa-thumbs-down fa-lg" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

Comments.propTypes = propTypes;

const mapStateToProps = state => ({
  selectedVideoComments: state.selectedVideoComments
});

export default connect(mapStateToProps)(Comments);
