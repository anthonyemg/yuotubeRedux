import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

const propTypes = {
  videos: PropTypes.array,
  resultsNumber: PropTypes.string.isRequired,
  handleSelectVideo: PropTypes.func.isRequired
};

class VideoList extends React.Component {
  constructor(props) {
    super();
    this.handleNextPath = this.handleNextPath.bind(this);
  }
  componentDidMount() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }
  componentWillUpdate() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }
  handleNextPath(path) {
    if (this.props.history.location.pathname !== path) {
      this.props.history.push(path);
    }
  }
  render() {
    if (this.props.videos) {
      return (
        <div className="VideoList">
          <div className="VideoList-top">
            <span>About {this.props.resultsNumber} results</span>
          </div>
          {this.props.videos.map((video, idx) => (
            <div
              className="VideoList-video"
              key={idx}
              onClick={() => {
                this.props.handleSelectVideo(video);
                this.handleNextPath('/player');
              }}
            >
              <div>
                <img src={video.snippet.thumbnails.medium.url} />
              </div>
              <div className="VideoList-videoDescription">
                <div className="VideoList-videoDescriptionTitle">
                  <span>{video.snippet.title}</span>
                </div>
                <div className="VideoList-videoDescriptionChannelTitle">
                  <span>{video.snippet.channelTitle}</span>
                  <span className="desktop">•</span>
                  <span className="desktop">{video.snippet.publishedAt}</span>
                </div>
                <span className="VideoList-videoDescriptionDescription">
                  {video.snippet.description}
                </span>
              </div>
            </div>
          ))}
        </div>
      );
    } else {
      return <span>Please search above for videos</span>;
    }
  }
}

VideoList.propTypes = propTypes;

export default withRouter(VideoList);
