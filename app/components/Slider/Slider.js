import React from 'react';
import PropTypes from 'prop-types';
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

// eslint-disable-next-line
export default class SliderComponent extends React.Component {
  render() {
    const { images } = this.props;
    return (
      <CarouselProvider
        naturalSlideWidth={100}
        naturalSlideHeight={100}
        totalSlides={60}
      >
        {
        !(images.length === 0) && (
          <Slider>
            {images.map((image, key) => (
              <Slide index={key}><img src={image.src} alt="slider" width="100%" height="100%" /></Slide>
            ))}
          </Slider>
        )}
        <ButtonBack>Back</ButtonBack>
        <ButtonNext>Next</ButtonNext>
      </CarouselProvider>
    );
  }
}
SliderComponent.propTypes = {
  images: PropTypes.array,
};
