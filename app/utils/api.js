// import axios from 'axios';

export const apiKey = '8e75c1728d7beec7f56daf9321714c74';

export const apiSecret = '1587d60c781050cf';

export const apiUrl = (text) =>
  `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&format=json&nojsoncallback=?&text=${text}&format=json&extras=url_o`;

export const getImageSizes = (photoID) =>
  `https://www.flickr.com/services/api/flickr.photos.getSizes&api_key=${apiKey}&format=json&nojsoncallback=?&photo_id=${photoID}`;
