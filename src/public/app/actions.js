export function updateVideos(videos) {
  return { type: 'UPDATE_VIDEOS', payload: videos };
}

export function updateSearchQuery(searchQuery) {
  return { type: 'UPDATE_SEARCH_QUERY', payload: searchQuery };
}
export function updateResultsNumber(number) {
  return { type: 'UPDATE_RESULTS_NUMBER', payload: number };
}

export function updateSelectedVideo(video) {
  return { type: 'UPDATE_SELECTED_VIDEO', payload: video };
}

export function updateSelectedVideoId(id) {
  return { type: 'UPDATE_SELECTED_VIDEO_ID', payload: id };
}

export function updateSelectedVideoComments(comments) {
  return { type: 'UPDATE_SELECTED_VIDEO_COMMENTS', payload: comments };
}

export function updateUpNextVideo(video) {
  return { type: 'UPDATE_UP_NEXT_VIDEO', payload: video };
}

export function updateUpNextVideos(videos) {
  return { type: 'UPDATE_UP_NEXT_VIDEOS', payload: videos };
}

export function updateTrendingVideos(videos) {
  return { type: 'UPDATE_TRENDING_VIDEOS', payload: videos };
}

export function updatePopularVideos(videos) {
  return { type: 'UPDATE_POPULAR_VIDEOS', payload: videos };
}

export function updateMovieTrailers(videos) {
  return { type: 'UPDATE_MOVIE_TRAILERS', payload: videos };
}

export function updateLateNight(videos) {
  return { type: 'UPDATE_LATE_NIGHT', payload: videos };
}
