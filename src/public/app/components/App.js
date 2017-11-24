import React from 'react';
import { connect } from 'react-redux';
import {
  updateVideos,
  updateResultsNumber,
  updateSelectedVideo,
  updateSelectedVideoId,
  updateSelectedVideoComments,
  updateUpNextVideo,
  updateUpNextVideos,
  updateTrendingVideos,
  updatePopularVideos,
  updateMovieTrailers,
  updateLateNight
} from '../actions';
import { Router, HashRouter, Route, hashHistory } from 'react-router-dom';

import createBrowserHistory from 'history/createBrowserHistory';

const customHistory = createBrowserHistory();

import Landing from './Landing';

import TopMenu from './TopMenu';
import TopMenuMobile from './TopMenuMobile';
import VideoList from './VideoList';
import VideoPlayer from './VideoPlayer';
import LandingVideoList from './LandingVideoList';
import MobileLanding from './MobileLanding';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleVideoListUpdate = this.handleVideoListUpdate.bind(this);
    this.numberWithCommas = this.numberWithCommas.bind(this);
    this.handleSelectVideo = this.handleSelectVideo.bind(this);
    this.handleFetchComments = this.handleFetchComments.bind(this);
    this.fetchRelatedVideos = this.fetchRelatedVideos.bind(this);
    this.fetchTrending = this.fetchTrending.bind(this);
    this.fetchPopularMusicVideos = this.fetchPopularMusicVideos.bind(this);
    this.fetchMovieTrailers = this.fetchMovieTrailers.bind(this);
    this.fetchLateNight = this.fetchLateNight.bind(this);
    // this.handleYuoTubePress = this.handleYuoTubePress.bind(this);
    this.handleUpNextVideos = this.handleUpNextVideos.bind(this);
  }
  componentWillMount() {
    this.fetchTrending();
    this.fetchPopularMusicVideos();
    this.fetchMovieTrailers();
    this.fetchLateNight();
  }
  handleVideoListUpdate(data) {
    this.props.updateVideos(data.items);
    this.props.updateResultsNumber(this.numberWithCommas(data.pageInfo.totalResults));
    this.props.updateSelectedVideo(null);
    this.props.updateSelectedVideoComments(null);
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
    this.props.updateSelectedVideo(video);
    this.props.updateSelectedVideoId(id);
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
        this.props.updateSelectedVideoComments(data.items);
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
  handleUpNextVideos(videos) {
    let random = Math.floor(videos.length * Math.random());
    let upNextVideo = videos.splice(random, 1);
    this.props.updateUpNextVideo(upNextVideo[0]);
    this.props.updateUpNextVideos(videos);
  }
  fetchTrending() {
    fetch('/trending', {
      method: 'GET'
    })
      .then(res => res.json())
      .then(data => {
        this.props.updateTrendingVideos(data.items);
      })
      .catch(err => console.log(err));
  }
  fetchPopularMusicVideos() {
    fetch('/popular/musicvideos', { method: 'GET' })
      .then(res => res.json())
      .then(data => {
        this.props.updatePopularVideos(data.items);
      })
      .catch(err => console.log(err));
  }
  fetchMovieTrailers() {
    fetch('/movie/trailers', { method: 'GET' })
      .then(res => res.json())
      .then(data => {
        this.props.updateMovieTrailers(data.items);
      })
      .catch(err => console.log(err));
  }
  fetchLateNight() {
    fetch('/latenight', { method: 'GET' })
      .then(res => res.json())
      .then(data => {
        this.props.updateLateNight(data.items);
      })
      .catch(err => console.log(err));
  }
  // handleYuoTubePress() {
  //   this.props.updateVideos(null);
  //   this.props.updateSelectedVideo(null);
  //   this.props.updateSelectedVideoId(null);
  // }
  render() {
    return (
      <Router history={customHistory}>
        <div className="App">
          <TopMenu handleVideoListUpdate={this.handleVideoListUpdate} />
          <TopMenuMobile
            handleVideoListUpdate={this.handleVideoListUpdate}
            handleYuoTubePress={this.handleYuoTubePress}
            selectedVideo={this.props.selectedVideo}
          />
          <Route
            exact
            path="/"
            component={() => <Landing handleSelectVideo={this.handleSelectVideo} />}
          />
          <Route
            exact
            path="/results"
            component={() => (
              <VideoList
                videos={this.props.videos}
                resultsNumber={this.props.resultsNumber}
                handleSelectVideo={this.handleSelectVideo}
              />
            )}
          />
          <Route
            exact
            path="/player"
            component={() => (
              <VideoPlayer
                selectedVideo={this.props.selectedVideo}
                selectedVideoId={this.props.selectedVideoId}
                handleSelectVideo={this.handleSelectVideo}
                selectedVideoComments={this.props.selectedVideoComments}
                upNextVideo={this.props.upNextVideo}
                upNextVideos={this.props.upNextVideos}
                handleSelectVideo={this.handleSelectVideo}
              />
            )}
          />
        </div>
      </Router>

      // <div className="App">
      //   <TopMenu
      //     handleVideoListUpdate={this.handleVideoListUpdate}
      //     handleYuoTubePress={this.handleYuoTubePress}
      //   />
      //   <TopMenuMobile
      //     handleVideoListUpdate={this.handleVideoListUpdate}
      //     handleYuoTubePress={this.handleYuoTubePress}
      //     selectedVideo={this.props.selectedVideo}
      //   />
      //   {this.props.trendingVideos &&
      //     this.props.popularMusicVideos &&
      //     this.props.movieTrailers &&
      //     this.props.lateNight &&
      //     !this.props.videos &&
      //     !this.props.selectedVideo && (
      //       <div className="landingVideoList-wrapper desktopLanding">
      //         <LandingVideoList
      //           videos={this.props.trendingVideos}
      //           title="Trending"
      //           handleSelectVideo={this.handleSelectVideo}
      //           convertDate={this.convertDate}
      //         />
      //         <LandingVideoList
      //           videos={this.props.popularMusicVideos}
      //           title="Popular Music Videos by Music"
      //           handleSelectVideo={this.handleSelectVideo}
      //           convertDate={this.convertDate}
      //         />
      //         <LandingVideoList
      //           videos={this.props.movieTrailers}
      //           title="Trailers by Movies - Topic"
      //           handleSelectVideo={this.handleSelectVideo}
      //           convertDate={this.convertDate}
      //         />
      //         <LandingVideoList
      //           videos={this.props.lateNight}
      //           title="Catch Up on Late Night by Popular on YouTube"
      //           handleSelectVideo={this.handleSelectVideo}
      //           convertDate={this.convertDate}
      //         />
      //       </div>
      //     )}
      //   {this.props.trendingVideos &&
      //     !this.props.selectedVideo &&
      //     !this.props.videos && (
      //       <MobileLanding
      //         videos={this.props.trendingVideos}
      //         handleSelectVideo={this.handleSelectVideo}
      //         convertDate={this.convertDate}
      //       />
      //     )}
      //   {this.props.videos &&
      //     !this.props.selectedVideo && (
      //       <VideoList
      //         videos={this.props.videos}
      //         resultsNumber={this.props.resultsNumber}
      //         handleSelectVideo={this.handleSelectVideo}
      //       />
      //     )}
      //   {this.props.selectedVideo && (
      //     <VideoPlayer
      //       selectedVideo={this.props.selectedVideo}
      //       selectedVideoId={this.props.selectedVideoId}
      //       handleSelectVideo={this.handleSelectVideo}
      //       selectedVideoComments={this.props.selectedVideoComments}
      //       upNextVideo={this.props.upNextVideo}
      //       upNextVideos={this.props.upNextVideos}
      //       handleSelectVideo={this.handleSelectVideo}
      //     />
      //   )}
      // </div>
    );
  }
}

const mapStateToProps = state => ({
  videos: state.videos,
  resultsNumber: state.resultsNumber,
  selectedVideo: state.selectedVideo,
  selectedVideoId: state.selectedVideoId,
  selectedVideoComments: state.selectedVideoComments,
  upNextVideo: state.upNextVideo,
  upNextVideos: state.upNextVideos
  // trendingVideos: state.trendingVideos,
  // popularMusicVideos: state.popularMusicVideos,
  // movieTrailers: state.movieTrailers,
  // lateNight: state.lateNight
});
const mapDispatchToProps = dispatch => ({
  updateVideos: videos => dispatch(updateVideos(videos)),
  updateResultsNumber: number => dispatch(updateResultsNumber(number)),
  updateSelectedVideo: video => dispatch(updateSelectedVideo(video)),
  updateSelectedVideoId: id => dispatch(updateSelectedVideoId(id)),
  updateSelectedVideoComments: comments => dispatch(updateSelectedVideoComments(comments)),
  updateUpNextVideo: video => dispatch(updateUpNextVideo(video)),
  updateUpNextVideos: videos => dispatch(updateUpNextVideos(videos)),
  updateTrendingVideos: videos => dispatch(updateTrendingVideos(videos)),
  updatePopularVideos: videos => dispatch(updatePopularVideos(videos)),
  updateMovieTrailers: videos => dispatch(updateMovieTrailers(videos)),
  updateLateNight: videos => dispatch(updateLateNight(videos))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
