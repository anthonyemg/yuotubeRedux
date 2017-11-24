import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  handleVideoListUpdate: PropTypes.func.isRequired,
  handleYuoTubePress: PropTypes.func.isRequired
};

class TopMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: ''
    };
    this.searchYouTube = this.searchYouTube.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchEnterKeyPress = this.handleSearchEnterKeyPress.bind(this);
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

  render() {
    return (
      <div className="TopMenu">
        <div className="topMenu-title">
          <div className="topMenu-titleBurger">
            <i className="fa fa-bars fa-lg" />
          </div>
          <i className="fa fa-youtube-play fa-med topMenu-youtubeLogo" />
          <span onClick={() => this.props.handleYuoTubePress()}>YuoTube</span>
        </div>

        <div className="topMenu-searchBar">
          <input
            placeholder="Search"
            value={this.state.searchQuery}
            onChange={this.handleSearchChange}
            onKeyPress={this.handleSearchEnterKeyPress}
          />
          <div className="topMenu-searchBarSearchButton" onClick={this.searchYouTube}>
            <i className="fa fa-search fa-1x" />
          </div>
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

export default TopMenu;
