import { createSelector } from 'reselect';

const selectCourse = (state) => state.course;

export const selectCurrentItem = createSelector([selectCourse], (course) => course.current);

export const selectListItems = createSelector([selectCourse], (course) => course.list);
export const selectItemById = (itemId) =>
  createSelector(selectListItems, (list) => list.result.items.find((item) => item._id === itemId));

export const selectCreatedItem = createSelector([selectCourse], (course) => course.create);

export const selectcreateDocument = createSelector(
  [selectCourse],
  (course) => course.createDocument
);

export const selectUpdatedItem = createSelector([selectCourse], (course) => course.update);

export const selectReadItem = createSelector([selectCourse], (course) => course.read);

export const selectHistoryItem = createSelector([selectCourse], (course) => course.history);

export const selectDeletedItem = createSelector([selectCourse], (course) => course.delete);

export const selectSearchedItems = createSelector([selectCourse], (course) => course.search);
