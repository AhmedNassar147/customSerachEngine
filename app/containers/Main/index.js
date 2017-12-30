import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Dialog, FlatButton } from 'material-ui';

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
  gridStyle,
  searchStyle,
  headerStyle,
 } from './mainStyle';

import Grid from '../../components/grid/Grid';
import SliderComponent from '../../components/Slider/Slider';

// eslint-disable-next-line
export class Main extends React.Component {
  state = {
    width: '100%',
    margin: '5 auto',
    paddingTop: '6%',
    srcValue: '',
    open: false,
  };

  handleSeachBarChanged = (event) => {
    this.props.onSeachBarChange('searchInputName', event);
  };

  handleRequestSearch = () => {
    this.props.onRequestSearch();
    this.setState({ paddingTop: '0px' });
  };

  handleGetImage = (event) => {
    const srcValue = event.target.src;
    this.setState({ srcValue, open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { images } = this.props;
    const { srcValue } = this.state;
    const actions = [<FlatButton label="Cancel" primary onClick={this.handleClose} />];

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

        <div style={gridStyle}>
          {
            !images.length === 0 ? null : (<Grid images={images} clickedImage={this.handleGetImage} />)
          }
        </div>

        <div>
          <Dialog
            title="Image and Slider"
            actions={actions}
            modal={false}
            open={this.state.open}
            onRequestClose={this.handleClose}
            autoScrollBodyContent
          >
            <div style={dialogContainer}>
              <div style={dialogContainerImage}>
                <img src={srcValue} alt="load" width="100%" height="100%" />
              </div>
              <div style={dialogContainerSlider}>
                <SliderComponent images={images} />
              </div>
            </div>
          </Dialog>
        </div>

      </div>
    );
  }
}

Main.propTypes = {
  onSeachBarChange: PropTypes.func.isRequired,
  onRequestSearch: PropTypes.func.isRequired,
  images: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({ main: makeSelectMain(), images: makeSelectImages() });

function mapDispatchToProps(dispatch) {
  return {
    onSeachBarChange: (searchInputName, value) => dispatch(mainActions.searchBarchanged({ inputName: searchInputName, inputValue: value })),
    onRequestSearch: () => dispatch(mainActions.requestSearch()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'main', reducer });
const withSaga = injectSaga({ key: 'main', saga });

export default compose(withReducer, withSaga, withConnect)(Main);
