import * as actionTypes from './types';

const contextActions = (dispatch) => {
  return {
    modal: {
      open: () => {
        dispatch({ type: actionTypes.OPEN_MODAL });
      },
      close: () => {
        dispatch({ type: actionTypes.CLOSE_MODAL });
      },
    },
    advancedBox: {
      open: () => {
        dispatch({ type: actionTypes.OPEN_ADVANCED_BOX });
      },
      close: () => {
        dispatch({ type: actionTypes.CLOSE_ADVANCED_BOX });
      },
    },
    editBox: {
      open: () => {
        dispatch({ type: actionTypes.OPEN_EDIT_BOX });
      },
      close: () => {
        dispatch({ type: actionTypes.CLOSE_EDIT_BOX });
      },
    },
    addBox: {
      open: () => {
        dispatch({ type: actionTypes.OPEN_ADD_BOX });
      },
      close: () => {
        dispatch({ type: actionTypes.CLOSE_ADD_BOX });
      },
    },
    panel: {
      open: () => {
        dispatch({ type: actionTypes.OPEN_PANEL });
      },
      close: () => {
        dispatch({ type: actionTypes.CLOSE_PANEL });
      },
      collapse: () => {
        dispatch({ type: actionTypes.COLLAPSE_PANEL });
      },
    },
    collapsedBox: {
      open: () => {
        dispatch({ type: actionTypes.OPEN_BOX });
      },
      close: () => {
        dispatch({ type: actionTypes.CLOSE_BOX });
      },
      collapse: () => {
        dispatch({ type: actionTypes.COLLAPSE_BOX });
      },
    },
    readBox: {
      open: () => {
        dispatch({ type: actionTypes.OPEN_READ_BOX });
        console.log('readBox open');
      },
      close: () => {
        dispatch({ type: actionTypes.CLOSE_READ_BOX });
        console.log('readBox close');
      },
      collapse: () => {
        dispatch({ type: actionTypes.COLLAPSE_READ_BOX });
      },
    },
    brochure: {
      open: () => {
        dispatch({ type: actionTypes.OPEN_BROCHURE_BOX });
        console.log('BROCHURE open');
      },
      close: () => {
        dispatch({ type: actionTypes.CLOSE_BROCHURE_BOX });
        console.log('BROCHURE close');
      },
      collapse: () => {
        dispatch({ type: actionTypes.COLLAPSE_BROCHURE_BOX });
      },
    },
  };
};

export default contextActions;