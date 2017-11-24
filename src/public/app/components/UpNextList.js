import React from 'react';

class UpNextList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={`video-playerUpNext ${this.props.type}`}>
        <div className="video-playerUpNextButtons">
          <span>Up next</span>
          <div>
            <span className="video-playerUpNextAutoplayButton">AUTOPLAY</span>
            <label className="switch">
              <input
                type="checkbox"
                defaultChecked={this.props.autoplay}
                onChange={this.props.handleAutoplayCheck}
              />
              <span className="slider round" />
            </label>
          </div>
        </div>
        <div
          className="video-playerUpNextVideoContainer"
          key="0"
          onClick={() => this.props.handleSelectVideo(this.props.upNextVideo)}
        >
          <img src={this.props.upNextVideo.snippet.thumbnails.medium.url} />
          <div className="video-playerUpNextVideoWrapper">
            <span className="video-playerUpNextVideoTitle">
              {this.props.upNextVideo.snippet.title}
            </span>
            <span className="video-playerUpNextVideoText">
              {this.props.upNextVideo.snippet.channelTitle}
            </span>
          </div>
        </div>
        <div className="video-playerUpNextList">
          {this.props.upNextVideos.map((video, idx) => (
            <div
              className="video-playerUpNextVideoListContainer"
              key={idx}
              onClick={() => this.props.handleSelectVideo(video)}
            >
              <img src={video.snippet.thumbnails.medium.url} />
              <div className="video-playerUpNextVideoWrapper">
                <span className="video-playerUpNextVideoTitle">{video.snippet.title}</span>
                <span className="video-playerUpNextVideoText">{video.snippet.channelTitle}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default UpNextList;
