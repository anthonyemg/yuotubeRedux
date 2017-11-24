import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  videos: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  handleSelectVideo: PropTypes.func.isRequired,
  convertDate: PropTypes.func.isRequired
};

class LandingVideoList extends React.Component {
  constructor(props) {
    super();
  }
  render() {
    return (
      <div className="landingVideoList">
        <span className="landingVideoList-title">{this.props.title}</span>
        <div className="landingVideoList-container">
          {this.props.videos.map((video, idx) => (
            <div
              className="landingVideoList-video"
              key={idx}
              onClick={() => this.props.handleSelectVideo(video)}
            >
              <img src={video.snippet.thumbnails.medium.url} />
              <div className="landingVideoList-description">
                <span className="landingVideoList-descriptionTitle">{video.snippet.title}</span>
                <span className="landingVideoList-descriptionSubTitle">
                  {video.snippet.channelTitle}
                </span>
                <span className="landingVideoList-descriptionSubTitle">
                  {this.props.convertDate(video.snippet.publishedAt)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

LandingVideoList.propTypes = propTypes;

export default LandingVideoList;
