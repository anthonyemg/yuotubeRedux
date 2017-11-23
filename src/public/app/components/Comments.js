import React from 'react';

class Comments extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='comments-container'>
        <div className='comments-title'>Comments</div>
        {this.props.selectedVideoComments.map((comment, idx) => (
          <div className='comments-commentWrapper' key={idx}>
            <div className='comments-userImage'>
              <img src={comment.snippet.topLevelComment.snippet.authorProfileImageUrl} />
            </div>
            <div className='comments-comment'>
              <span className='comments-commentName'>{comment.snippet.topLevelComment.snippet.authorDisplayName}</span>
              <span className='comments-commentText'>{comment.snippet.topLevelComment.snippet.textDisplay}</span>
              <div className='comments-commentReply'>
                <span>REPLY</span>
                <div dangerouslySetInnerHTML={{__html: comment.snippet.topLevelComment.snippet.likeCount}}>
                </div>
                <i className='fa fa-thumbs-up fa-lg' />
                <i className='fa fa-thumbs-down fa-lg' />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

export default Comments;
