import React from 'react';
import Gallery from 'react-photo-gallery';
import PropTypes from 'prop-types';

// eslint-disable-next-line
export default class DataGrid extends React.Component {
  render() {
    const { images, clickedImage } = this.props;
    return (
      <div>
        {!images ? (
          <div>loading images</div>
        ) : (
          <Gallery columns={6} photos={images} onClick={clickedImage} />
        )}
      </div>
    );
  }
}

DataGrid.propTypes = { images: PropTypes.arrayOf(PropTypes.object), clickedImage: PropTypes.func };

const ImageComponent = ({ src }) => <img width="200" src={src} alt="loading" />;

ImageComponent.propTypes = {
  src: PropTypes.string,
};
