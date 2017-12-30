import { takeLatest, select, put } from 'redux-saga/effects';
import axios from 'axios';
import mainActions from './actions';
import mainTypes from './constants';
import { apiUrl } from '../../utils/api';

const searchData = (state) => state.get('main').toJS();
export function* requestSearch() {
  const { searchbarchangedData } = yield select(searchData);
  const search = searchbarchangedData.searchInputName;
  // eslint-disable-next-line
  try {
    const images = yield makeRequest(search);
    yield put(mainActions.requestSearchSuccess(images));
  } catch (e) {
    // console.log('[searching result error]', e);
    yield put(mainActions.requestSearchFaluire(e));
  }
}

const makeRequest = async (text) => {
  const res = await axios.get(apiUrl(text));
  return res.data.photos.photo
    .slice(0, 60)
    .filter((photo) => photo.url_o)
    .map((photo) => ({
      src: photo.url_o,
      width: 2,
      height: 1,
    }));
};

export default function* defaultSaga() {
  yield [takeLatest(mainTypes.REQUEST_SEARCH, requestSearch)];
}
