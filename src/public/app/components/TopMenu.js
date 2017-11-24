import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateSearchQuery } from '../actions';
import { Link, withRouter } from 'react-router-dom';

const propTypes = {
  handleVideoListUpdate: PropTypes.func.isRequired,
  handleYuoTubePress: PropTypes.func.isRequired
};

class TopMenu extends React.Component {
  constructor(props) {
    super();

    this.searchYouTube = this.searchYouTube.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchEnterKeyPress = this.handleSearchEnterKeyPress.bind(this);
    this.handleNextPath = this.handleNextPath.bind(this);
  }
  searchYouTube() {
    if (this.props.searchQuery.length > 0) {
      fetch('/videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: this.props.searchQuery })
      })
        .then(res => res.json())
        .then(data => {
          this.props.handleVideoListUpdate(data);
        })
        .catch(err => console.log(err));
    }
  }
  handleSearchChange(e) {
    this.props.updateSearchQuery(e.target.value);
  }
  handleSearchEnterKeyPress(e) {
    if (e.charCode == 13) {
      this.searchYouTube();
      this.handleNextPath('/results');
    }
  }
  handleNextPath(path) {
    if (this.props.history.location.pathname !== path) {
      this.props.history.push(path);
    }
  }
  render() {
    return (
      <div className="TopMenu">
        <div className="topMenu-title">
          <div className="topMenu-titleBurger">
            <i className="fa fa-bars fa-lg" />
          </div>
          <i className="fa fa-youtube-play fa-med topMenu-youtubeLogo" />
          <span
            onClick={() => {
              this.props.handleYuoTubePress();
              this.handleNextPath('/');
            }}
          >
            YuoTube
          </span>
        </div>

        <div className="topMenu-searchBar">
          <input
            placeholder="Search"
            value={this.props.searchQuery}
            onChange={this.handleSearchChange}
            onKeyPress={this.handleSearchEnterKeyPress}
          />
          <Link
            to="/results"
            className="topMenu-searchBarSearchButton"
            onClick={this.searchYouTube}
          >
            <i className="fa fa-search fa-1x" />
          </Link>
        </div>

        <div className="topMenu-navigationButton">
          <i className="fa fa-upload fa-lg" />
          <i className="fa fa-th fa-lg" />
          <i className="fa fa-ellipsis-v fa-lg" />
          <span>SIGN IN</span>
        </div>
      </div>
    );
  }
}

TopMenu.propTypes = propTypes;

const mapStateToProps = state => ({
  searchQuery: state.searchQuery
});

const mapDispatchToProps = dispatch => ({
  updateSearchQuery: searchQuery => dispatch(updateSearchQuery(searchQuery))
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TopMenu));
