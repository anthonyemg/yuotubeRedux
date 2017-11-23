import React from 'react';

class MobileLanding extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className='mobileLanding-container mobile'>
        <div className='mobileLanding-wrapper'>
          {this.props.videos.map((video, idx) => (
            <div className='mobileLanding-video' key={idx} onClick={() => this.props.handleSelectVideo(video)}>
              <div className='mobileLanding-videoImage' >
                <img src={video.snippet.thumbnails.high.url} />
              </div>
              <div className='landingVideoList-description'>
                <span className='landingVideoList-descriptionTitle'>{video.snippet.title}</span>
                <span className='landingVideoList-descriptionSubTitle'>{video.snippet.channelTitle}</span>
                <span className='landingVideoList-descriptionSubTitle'>{this.props.convertDate(video.snippet.publishedAt)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default MobileLanding;
