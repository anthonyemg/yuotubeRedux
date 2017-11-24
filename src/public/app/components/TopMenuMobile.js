import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  handleVideoListUpdate: PropTypes.func.isRequired,
  handleYuoTubePress: PropTypes.func.isRequired,
  selectedVideo: PropTypes.object
};

class TopMenuMobile extends React.Component {
  constructor(props) {
    super();
    this.state = {
      searchQuery: '',
      showSearchBar: false
    };
    this.searchYouTube = this.searchYouTube.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchEnterKeyPress = this.handleSearchEnterKeyPress.bind(this);
    this.handleShowSearchBar = this.handleShowSearchBar.bind(this);
    this.handleHideSearchBar = this.handleHideSearchBar.bind(this);
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
          this.setState({
            showSearchBar: false
          });
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

  handleShowSearchBar() {
    this.setState({
      showSearchBar: true
    });
  }

  handleHideSearchBar() {
    this.setState({
      showSearchBar: false
    });
  }

  render() {
    return (
      <div className="TopMenuMobile">
        <div
          className="TopMenuMobile-top"
          style={{ backgroundColor: this.props.selectedVideo ? 'rgb(51,51,51)' : 'rgb(253,0,0)' }}
        >
          <div>
            <i
              className="fa fa-youtube-play fa-2x"
              onClick={() => this.props.handleYuoTubePress()}
              style={{ marginLeft: 12, marginRight: 12 }}
            />
            {!this.state.showSearchBar && !this.state.searchQuery && <span>Home</span>}
            {!this.state.showSearchBar && <span>{this.state.searchQuery}</span>}
          </div>

          {this.state.showSearchBar && (
            <input
              className="topMenuMobile-input"
              placeholder="Search YouTube"
              value={this.state.searchQuery}
              onChange={this.handleSearchChange}
              onKeyPress={this.handleSearchEnterKeyPress}
            />
          )}
          <div>
            {!this.state.showSearchBar ? (
              <div>
                <i
                  className="fa fa-search fa-lg"
                  style={{ marginLeft: 12, marginRight: 12 }}
                  onClick={this.handleShowSearchBar}
                />
                <i className="fa fa-ellipsis-v fa-lg" style={{ marginLeft: 12, marginRight: 12 }} />
              </div>
            ) : (
              <i
                className="fa fa-search fa-lg"
                style={{ marginLeft: 12, marginRight: 12 }}
                onClick={this.searchYouTube}
              />
            )}
          </div>
        </div>
        <div className="TopMenuMobile-bottom">
          <i className="fa fa-home fa-2x" />
          <i className="fa fa-fire fa-2x" />
          <i className="fa fa-user fa-2x" />
        </div>
        {this.state.showSearchBar && (
          <div className="lightBox" onClick={this.handleHideSearchBar} />
        )}
      </div>
    );
  }
}

TopMenuMobile.propTypes = propTypes;

export default TopMenuMobile;
