import { combineReducers } from 'redux';

const videos = (state = null, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const resultsNumber = (state = 0, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const selectedVideo = (state = null, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
const selectedVideoId = (state = null, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
const selectedVideoComments = (state = null, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const upNextVideo = (state = null, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const upNextVideoList = (state = null, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const trendingVideos = (state = null, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const popularMusicVideos = (state = null, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const movieTrailers = (state = null, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const lateNight = (state = null, action) => {
  switch (action.type) {
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
  upNextVideoList,
  trendingVideos,
  popularMusicVideos,
  movieTrailers,
  lateNight
});

export default rootReducer;
