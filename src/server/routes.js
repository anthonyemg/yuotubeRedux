const routes = require('express').Router();
const request = require('request');

routes.post('/videos', function(req, res) {
  request.get(
    'https://www.googleapis.com/youtube/v3/search?' +
      'key=' +
      process.env.YOUTUBE_API_KEY +
      '&q=' +
      req.body.data +
      '&type=video&chart=relavence&part=snippet,id&maxResults=20',
    function(e, r, data) {
      res.send(data);
    }
  );
});

routes.post('/comments', function(req, res) {
  request.get(
    'https://www.googleapis.com/youtube/v3/commentThreads?' +
      'key=' +
      process.env.YOUTUBE_API_KEY +
      '&videoId=' +
      req.body.data +
      '&part=snippet,replies',
    function(e, r, data) {
      res.send(data);
    }
  );
});

routes.post('/related/videos', function(req, res) {
  request.get(
    'https://www.googleapis.com/youtube/v3/search?' +
      'part=snippet&type=video&maxResults=20' +
      '&relatedToVideoId=' +
      req.body.data +
      '&key=' +
      process.env.YOUTUBE_API_KEY,
    function(e, r, data) {
      res.send(data);
    }
  );
});

//Trending
routes.get('/trending', function(req, res) {
  request.get(
    'https://www.googleapis.com/youtube/v3/videos?' +
      'part=snippet&chart=mostPopular&maxResults=20' +
      '&key=' +
      process.env.YOUTUBE_API_KEY,
    function(e, r, data) {
      res.send(data);
    }
  );
});

//Channel 'Music'
//Playlist 'Popular Music Videos'
routes.get('/popular/musicvideos', function(req, res) {
  request.get(
    'https://www.googleapis.com/youtube/v3/playlistItems?' +
      'part=snippet,contentDetails&maxResults=20' +
      '&playlistId=PLFgquLnL59alCl_2TQvOiD5Vgm1hCaGSI' +
      '&key=' +
      process.env.YOUTUBE_API_KEY,
    function(e, r, data) {
      res.send(data);
    }
  );
});

routes.get('/movie/trailers', function(req, res) {
  request.get(
    'https://www.googleapis.com/youtube/v3/playlistItems?' +
      '&key=' +
      process.env.YOUTUBE_API_KEY +
      '&playlistId=PLzjFbaFzsmMT_VuMSVQxfkQIw7VNbHyVi' +
      '&type=video&chart=relavence&part=snippet,id&maxResults=20',
    function(e, r, data) {
      res.send(data);
    }
  );
});

//Channel 'Popular on YouTube'
//Playlist 'Catch Up on Late Night'
routes.get('/latenight', function(req, res) {
  request.get(
    'https://www.googleapis.com/youtube/v3/playlistItems?' +
      'part=snippet,contentDetails&maxResults=20' +
      '&playlistId=PLrEnWoR732-CN09YykVof2lxdI3MLOZda' +
      '&key=' +
      process.env.YOUTUBE_API_KEY,
    function(e, r, data) {
      res.send(data);
    }
  );
});

module.exports = routes;
