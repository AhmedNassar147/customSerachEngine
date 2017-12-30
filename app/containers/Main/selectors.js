import { createSelector } from 'reselect';

/**
 * Direct selector to the main state domain
 */
const selectMainDomain = (state) => state.get('main');

export const makeSelectsearchbarchangedData = () =>
  createSelector(selectMainDomain, (substate) =>
    substate.get('searchbarchangedData').toJS()
  );

export const makeSelectImages = () =>
  createSelector(
    selectMainDomain,
    (substate) => substate && substate.get('images').toJS()
  );

const makeSelectMain = () =>
  createSelector(selectMainDomain, (substate) => substate.toJS());

export default makeSelectMain;
export { selectMainDomain };
