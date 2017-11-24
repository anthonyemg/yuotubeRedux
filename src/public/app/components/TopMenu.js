import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

const propTypes = {
  handleVideoListUpdate: PropTypes.func.isRequired
  // handleYuoTubePress: PropTypes.func.isRequired
};

class TopMenu extends React.Component {
  constructor(props) {
    super();
    this.state = {
      searchQuery: ''
    };
    this.searchYouTube = this.searchYouTube.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchEnterKeyPress = this.handleSearchEnterKeyPress.bind(this);
    this.handleNextPath = this.handleNextPath.bind(this);
  }
  searchYouTube() {
    if (this.state.searchQuery.length > 0) {
      fetch('/videos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: this.state.searchQuery })
      })
        .then(res => res.json())
        .then(data => {
          this.props.handleVideoListUpdate(data);
        })
        .catch(err => console.log(err));
    }
  }
  handleSearchChange(e) {
    this.setState({
      searchQuery: e.target.value
    });
  }
  handleSearchEnterKeyPress(e) {
    if (e.charCode == 13) {
      this.searchYouTube();
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
          <span onClick={() => this.handleNextPath('/')}>YuoTube</span>
        </div>

        <div className="topMenu-searchBar">
          <input
            placeholder="Search"
            value={this.state.searchQuery}
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

export default withRouter(TopMenu);
