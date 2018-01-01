import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Paper } from 'material-ui';

import { createStructuredSelector } from 'reselect';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import SearchBar from 'material-ui-search-bar';

import makeSelectMain, { makeSelectImages } from './selectors';
import mainActions from './actions';
import reducer from './reducer';
import saga from './saga';
import {
  dialogContainer,
  dialogContainerImage,
  dialogContainerSlider,
  searchStyle,
  headerStyle,
  gridContainer,
  imgStyle,
 } from './mainStyle';

import './style.css';
// import Grid from '../../components/grid/Grid';
import SliderComponent from '../../components/Slider/Slider';

// eslint-disable-next-line
export class Main extends React.Component {
  state = {
    width: '100%',
    margin: '5 auto',
    paddingTop: '6%',
    srcValue: '',
    display: 'none',
  };

  handleSeachBarChanged = (event) => {
    this.props.onSeachBarChange('searchInputName', event);
  };

  handleRequestSearch = () => {
    this.props.onRequestSearch();
    this.setState({ paddingTop: '0%' });
  };

  handleGetImage = (event) => {
    const srcValue = event.target.src;
    this.setState({ srcValue, display: 'flex' });
  };

  render() {
    const { images } = this.props;
    const { srcValue } = this.state;
    return (
      <div style={{ width: this.state.width, margin: this.state.margin, paddingTop: this.state.paddingTop }}>

        <div style={headerStyle}>
          <h1>Flicker API</h1>
        </div>

        <div>
          <SearchBar
            style={searchStyle}
            onChange={this.handleSeachBarChanged}
            onRequestSearch={this.handleRequestSearch}
          />
        </div>

        <div>
          {
            !images ? (
              <div style={{ textAlign: 'center' }}>Loading Images...</div>
              ) : (
                <div style={gridContainer}>
                  {images.map((image) => (
                    <div className="hoverable">
                      <span className="hint">image from flicker api</span>
                      <img
                        src={image.src}
                        onClick={this.handleGetImage}
                        alt="loadingImages"
                        width="100%"
                        height="100%"
                        style={imgStyle}
                        role="presentation"
                      />
                    </div>
                  ))}
                </div>
            )
          }
        </div>

        <Paper style={{ display: this.state.display, ...dialogContainer }}>
          <div style={dialogContainerImage}>
            <img src={srcValue} alt="load" width="100%" height="100%" />
          </div>

          <div style={dialogContainerSlider}>
            <SliderComponent images={images} />
          </div>
        </Paper>

      </div>
    );
  }
}

Main.propTypes = {
  onSeachBarChange: PropTypes.func.isRequired,
  onRequestSearch: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(PropTypes.object),
};

const mapStateToProps = createStructuredSelector({
  main: makeSelectMain(),
  images: makeSelectImages(),
});

function mapDispatchToProps(dispatch) {
  return {
    onSeachBarChange: (searchInputName, value) => dispatch(
      mainActions.searchBarchanged({
        inputName: searchInputName,
        inputValue: value,
      })
    ),
    onRequestSearch: () => dispatch(mainActions.requestSearch()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'main', reducer });
const withSaga = injectSaga({ key: 'main', saga });

export default compose(withReducer, withSaga, withConnect)(Main);
