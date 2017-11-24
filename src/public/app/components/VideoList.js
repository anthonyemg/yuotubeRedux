import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  videos: PropTypes.array.isRequired,
  resultsNumber: PropTypes.string.isRequired,
  handleSelectVideo: PropTypes.func.isRequired
};

class VideoList extends React.Component {
  constructor(props) {
    super();
  }
  componentDidMount() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }
  componentWillUpdate() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
    console.log('type of resulstNumber', typeof this.props.resultsNumber);
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
              onClick={() => this.props.handleSelectVideo(video)}
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
      return null;
    }
  }
}

VideoList.propTypes = propTypes;

export default VideoList;
