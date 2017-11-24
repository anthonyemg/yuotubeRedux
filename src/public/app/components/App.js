import React from 'react';
import { connect } from 'react-redux';
import {} from '../actions';

import TopMenu from './TopMenu';
import TopMenuMobile from './TopMenuMobile';
import VideoList from './VideoList';
import VideoPlayer from './VideoPlayer';
import LandingVideoList from './LandingVideoList';
import MobileLanding from './MobileLanding';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: null,
      resultsNumber: 0,
      selectedVideo: null,
      selectedVideoId: null,
      selectedVideoComments: null,
      upNextVideo: null,
      upNextVideoList: null,
      trendingVideos: null,
      popularMusicVideos: null,
      movieTrailers: null,
      lateNight: null
    };
    this.handleVideoListUpdate = this.handleVideoListUpdate.bind(this);
    this.numberWithCommas = this.numberWithCommas.bind(this);
    this.handleSelectVideo = this.handleSelectVideo.bind(this);
    this.handleFetchComments = this.handleFetchComments.bind(this);
    this.fetchRelatedVideos = this.fetchRelatedVideos.bind(this);
    this.fetchTrending = this.fetchTrending.bind(this);
    this.fetchPopularMusicVideos = this.fetchPopularMusicVideos.bind(this);
    this.fetchMovieTrailers = this.fetchMovieTrailers.bind(this);
    this.fetchLateNight = this.fetchLateNight.bind(this);
    this.handleYuoTubePress = this.handleYuoTubePress.bind(this);
    this.convertDate = this.convertDate.bind(this);
    this.handleUpNextVideos = this.handleUpNextVideos.bind(this);
  }
  componentWillMount() {
    this.fetchTrending();
    this.fetchPopularMusicVideos();
    this.fetchMovieTrailers();
    this.fetchLateNight();
  }
  componentDidMount() {
    this.setState({
      landingVideoList: true
    });
  }
  handleVideoListUpdate(data) {
    this.setState({
      videos: data.items,
      resultsNumber: this.numberWithCommas(data.pageInfo.totalResults),
      selectedVideo: null,
      selectedVideoComments: null
    });
  }
  numberWithCommas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x)) x = x.replace(pattern, '$1,$2');
    return x;
  }
  handleSelectVideo(video) {
    var id;
    if (video.kind === 'youtube#playlistItem') {
      id = video.snippet.resourceId.videoId;
    } else if (video.kind === 'youtube#video') {
      id = video.id;
    } else if (video.kind === 'youtube#searchResult') {
      id = video.id.videoId;
    }
    this.setState({
      selectedVideo: video,
      selectedVideoId: id
    });
    this.handleFetchComments(id);
    this.fetchRelatedVideos(id);
  }
  handleFetchComments(videoId) {
    fetch('/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: videoId })
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          selectedVideoComments: data.items
        });
      })
      .catch(err => console.log(err));
  }
  fetchRelatedVideos(videoId) {
    fetch('/related/videos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ data: videoId })
    })
      .then(res => res.json())
      .then(data => {
        this.handleUpNextVideos(data.items);
      })
      .catch(err => console.log(err));
  }
  handleUpNextVideos(list) {
    let random = Math.floor(list.length * Math.random());
    let upNextVideo = list.splice(random, 1);
    this.setState({
      upNextVideo: upNextVideo[0],
      upNextVideoList: list
    });
  }
  fetchTrending() {
    fetch('/trending', {
      method: 'GET'
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          trendingVideos: data.items
        });
      })
      .catch(err => console.log(err));
  }
  fetchPopularMusicVideos() {
    fetch('/popular/musicvideos', { method: 'GET' })
      .then(res => res.json())
      .then(data => {
        this.setState({
          popularMusicVideos: data.items
        });
      })
      .catch(err => console.log(err));
  }
  fetchMovieTrailers() {
    fetch('/movie/trailers', { method: 'GET' })
      .then(res => res.json())
      .then(data => {
        this.setState({
          movieTrailers: data.items
        });
      })
      .catch(err => console.log(err));
  }
  fetchLateNight() {
    fetch('/latenight', { method: 'GET' })
      .then(res => res.json())
      .then(data => {
        this.setState({
          lateNight: data.items
        });
      })
      .catch(err => console.log(err));
  }
  handleYuoTubePress() {
    this.setState({
      selectedVideo: null,
      selectedVideoId: null,
      videos: null
    });
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
      <div className="App">
        <TopMenu
          handleVideoListUpdate={this.handleVideoListUpdate}
          handleYuoTubePress={this.handleYuoTubePress}
        />
        <TopMenuMobile
          handleVideoListUpdate={this.handleVideoListUpdate}
          handleYuoTubePress={this.handleYuoTubePress}
          selectedVideo={this.state.selectedVideo}
        />
        {this.state.trendingVideos &&
          this.state.popularMusicVideos &&
          this.state.movieTrailers &&
          this.state.lateNight &&
          !this.state.videos &&
          !this.state.selectedVideo && (
            <div className="landingVideoList-wrapper desktopLanding">
              <LandingVideoList
                videos={this.state.trendingVideos}
                title="Trending"
                handleSelectVideo={this.handleSelectVideo}
                convertDate={this.convertDate}
              />
              <LandingVideoList
                videos={this.state.popularMusicVideos}
                title="Popular Music Videos by Music"
                handleSelectVideo={this.handleSelectVideo}
                convertDate={this.convertDate}
              />
              <LandingVideoList
                videos={this.state.movieTrailers}
                title="Trailers by Movies - Topic"
                handleSelectVideo={this.handleSelectVideo}
                convertDate={this.convertDate}
              />
              <LandingVideoList
                videos={this.state.lateNight}
                title="Catch Up on Late Night by Popular on YouTube"
                handleSelectVideo={this.handleSelectVideo}
                convertDate={this.convertDate}
              />
            </div>
          )}
        {this.state.trendingVideos &&
          !this.state.selectedVideo &&
          !this.state.videos && (
            <MobileLanding
              videos={this.state.trendingVideos}
              handleSelectVideo={this.handleSelectVideo}
              convertDate={this.convertDate}
            />
          )}
        {this.state.videos &&
          !this.state.selectedVideo && (
            <VideoList
              videos={this.state.videos}
              resultsNumber={this.state.resultsNumber}
              handleSelectVideo={this.handleSelectVideo}
            />
          )}
        {this.state.selectedVideo && (
          <VideoPlayer
            selectedVideo={this.state.selectedVideo}
            selectedVideoId={this.state.selectedVideoId}
            handleSelectVideo={this.handleSelectVideo}
            selectedVideoComments={this.state.selectedVideoComments}
            upNextVideo={this.state.upNextVideo}
            upNextVideoList={this.state.upNextVideoList}
            handleSelectVideo={this.handleSelectVideo}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  test: state.test
});
const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(App);
