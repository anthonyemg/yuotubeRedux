import React from 'react';

class VideoList extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  componentWillUpdate() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  render() {
    if(this.props.videos) {
      return (
        <div className='VideoList'>
          <div className='VideoList-top'>
            <span>About {this.props.resultsNumber} results</span>
          </div>
          {this.props.videos.map((video, idx) =>  (
            <div className='VideoList-video' key={idx} onClick={() => this.props.handleSelectVideo(video)}>
              <div>
                {/* <div
                  className='VideoList-videoImage'
                  style={{background: `url(${video.snippet.thumbnails.default.url})`}}>
                </div> */}
                <img src={video.snippet.thumbnails.medium.url} />
              </div>
              <div className='VideoList-videoDescription'>

                <div className='VideoList-videoDescriptionTitle'>
                  <span>{video.snippet.title}</span>
                </div>

                <div className='VideoList-videoDescriptionChannelTitle'>
                  <span>{video.snippet.channelTitle}</span>
                  <span className='desktop'>•</span>
                  <span className='desktop'>{video.snippet.publishedAt}</span>
                </div>

                <span className='VideoList-videoDescriptionDescription'>
                  {video.snippet.description}
                </span>

              </div>
            </div>
          ))}
        </div>
      )
    } else {
      return (
        <div></div>
      )
    }
  }

}

export default VideoList;
