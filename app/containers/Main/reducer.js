import { fromJS } from 'immutable';
import mainTypes from './constants';

const initialState = fromJS({ searchbarchangedData: {}, images: [], errors: {} });

function mainReducer(state = initialState, action) {
  const oldState = state.toJS();
  switch (action.type) {
    case mainTypes.SEARCH_BAR_CHANGED:
      return state.merge({
        searchbarchangedData: {
          ...oldState.searchbarchangedData,
          [action.inputName]: action.inputValue,
        },
      });

    case mainTypes.SEARCH_SUCCESS:
      return state.merge({ images: action.images });

    case mainTypes.SEARCH_FAILURE:
      return state.merge({ errors: action.error });
    default:
      return state;
  }
}

export default mainReducer;
