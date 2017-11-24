import React from 'react';
import { connect } from 'react-redux';

import TopMenu from './TopMenu';
import TopMenuMobile from './TopMenuMobile';
import LandingVideoList from './LandingVideoList';
import MobileLanding from './MobileLanding';

class Landing extends React.Component {
  constructor(props) {
    super();
    this.convertDate = this.convertDate.bind(this);
  }
  convertDate(date) {
    let videoDate = new Date(date);
    let currentDate = new Date();
    if (currentDate.getFullYear() - videoDate.getFullYear() > 0) {
      let diff = currentDate.getFullYear() - videoDate.getFullYear();
      return diff > 1 ? diff + ' years ago' : '1 year ago';
    } else if (currentDate.getMonth() - videoDate.getMonth() > 0) {
      let diff = currentDate.getMonth() - videoDate.getMonth();
      return diff > 1 ? diff + ' months ago' : '1 month ago';
    } else if (currentDate.getDate() - videoDate.getDate() > 6) {
      let diff = Math.floor((currentDate.getDate() - videoDate.getDate()) / 7);
      return diff > 1 ? diff + ' weeks ago' : '1 week ago';
    } else if (currentDate.getDate() - videoDate.getDate() > 0) {
      let diff = currentDate.getDate() - videoDate.getDate();
      return diff > 1 ? diff + ' days ago' : '1 day ago';
    } else if (videoDate.getHours() - currentDate.getHours() > 0) {
      let diff = videoDate.getHours() - currentDate.getHours();
      return diff > 1 ? diff + ' hours ago' : '1 hour ago';
    } else {
      return '1 hour ago';
    }
  }
  render() {
    return (
      <div className="landing-container">
        {this.props.trendingVideos &&
          this.props.popularMusicVideos &&
          this.props.movieTrailers &&
          this.props.lateNight &&
          !this.props.videos &&
          !this.props.selectedVideo && (
            <div className="landingVideoList-wrapper desktopLanding">
              <LandingVideoList
                videos={this.props.trendingVideos}
                title="Trending"
                handleSelectVideo={this.props.handleSelectVideo}
                convertDate={this.convertDate}
              />
              <LandingVideoList
                videos={this.props.popularMusicVideos}
                title="Popular Music Videos by Music"
                handleSelectVideo={this.props.handleSelectVideo}
                convertDate={this.convertDate}
              />
              <LandingVideoList
                videos={this.props.movieTrailers}
                title="Trailers by Movies - Topic"
                handleSelectVideo={this.props.handleSelectVideo}
                convertDate={this.convertDate}
              />
              <LandingVideoList
                videos={this.props.lateNight}
                title="Catch Up on Late Night by Popular on YouTube"
                handleSelectVideo={this.props.handleSelectVideo}
                convertDate={this.convertDate}
              />
            </div>
          )}

        {this.props.trendingVideos &&
          !this.props.selectedVideo &&
          !this.props.videos && (
            <MobileLanding
              videos={this.props.trendingVideos}
              handleSelectVideo={this.props.handleSelectVideo}
              convertDate={this.convertDate}
            />
          )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  trendingVideos: state.trendingVideos,
  popularMusicVideos: state.popularMusicVideos,
  movieTrailers: state.movieTrailers,
  lateNight: state.lateNight
});
const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Landing);
