import { combineReducers } from 'redux';

const videos = (state = null, action) => {
  switch (action.type) {
    case 'UPDATE_VIDEOS':
      return action.payload;
    default:
      return state;
  }
};

const resultsNumber = (state = 0, action) => {
  switch (action.type) {
    case 'UPDATE_RESULTS_NUMBER':
      return action.payload;
    default:
      return state;
  }
};

const selectedVideo = (state = null, action) => {
  switch (action.type) {
    case 'UPDATE_SELECTED_VIDEO':
      return action.payload;
    default:
      return state;
  }
};
const selectedVideoId = (state = null, action) => {
  switch (action.type) {
    case 'UPDATE_SELECTED_VIDEO_ID':
      return action.payload;
    default:
      return state;
  }
};
const selectedVideoComments = (state = null, action) => {
  switch (action.type) {
    case 'UPDATE_SELECTED_VIDEO_COMMENTS':
      return action.payload;
    default:
      return state;
  }
};

const upNextVideo = (state = null, action) => {
  switch (action.type) {
    case 'UPDATE_UP_NEXT_VIDEO':
      return action.payload;
    default:
      return state;
  }
};

const upNextVideos = (state = null, action) => {
  switch (action.type) {
    case 'UPDATE_UP_NEXT_VIDEOS':
      return action.payload;
    default:
      return state;
  }
};

const trendingVideos = (state = null, action) => {
  switch (action.type) {
    case 'UPDATE_TRENDING_VIDEOS':
      return action.payload;
    default:
      return state;
  }
};

const popularMusicVideos = (state = null, action) => {
  switch (action.type) {
    case 'UPDATE_POPULAR_VIDEOS':
      return action.payload;
    default:
      return state;
  }
};

const movieTrailers = (state = null, action) => {
  switch (action.type) {
    case 'UPDATE_MOVIE_TRAILERS':
      return action.payload;
    default:
      return state;
  }
};

const lateNight = (state = null, action) => {
  switch (action.type) {
    case 'UPDATE_LATE_NIGHT':
      return action.payload;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  videos,
  resultsNumber,
  selectedVideo,
  selectedVideoId,
  selectedVideoComments,
  upNextVideo,
  upNextVideos,
  trendingVideos,
  popularMusicVideos,
  movieTrailers,
  lateNight
});

export default rootReducer;
