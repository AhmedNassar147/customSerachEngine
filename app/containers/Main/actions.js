import mainTypes from './constants';

export default {
  searchBarchanged: ({ inputName, inputValue }) => ({ type: mainTypes.SEARCH_BAR_CHANGED, inputName, inputValue }),

  requestSearch: () => ({ type: mainTypes.REQUEST_SEARCH }),

  requestSearchSuccess: (images) => ({ type: mainTypes.SEARCH_SUCCESS, images }),

  requestSearchFaluire: (error) => ({ type: mainTypes.SEARCH_FAILURE, error }),
};
