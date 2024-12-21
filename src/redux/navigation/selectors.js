import { createSelector } from 'reselect';

const selectNavigation = (state) => state.navigation;

export const selectCurrentItem = createSelector(
  [selectNavigation],
  (navigation) => navigation.current
);

export const selectListItems = createSelector([selectNavigation], (navigation) => navigation.list);
export const selectItemById = (itemId) =>
  createSelector(selectListItems, (list) => list.result.items.find((item) => item._id === itemId));

export const selectCreatedItem = createSelector(
  [selectNavigation],
  (navigation) => navigation.create
);

export const selectUpdatedItem = createSelector(
  [selectNavigation],
  (navigation) => navigation.update
);

export const selectRecordPaymentItem = createSelector(
  [selectNavigation],
  (navigation) => navigation.recordPayment
);

export const selectReadItem = createSelector([selectNavigation], (navigation) => navigation.read);

export const selectDeletedItem = createSelector(
  [selectNavigation],
  (navigation) => navigation.delete
);

export const selectSearchedItems = createSelector(
  [selectNavigation],
  (navigation) => navigation.search
);
