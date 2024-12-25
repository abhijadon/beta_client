import * as actionTypes from './types';

export const initialState = {
  isModalOpen: false,
  isPanelClose: true,
  isBoxCollapsed: false,
  isReadBoxOpen: false,
  isBrochureBoxOpen: false,
  isAdvancedBoxOpen: false,
  isEditBoxOpen: false,
  isAddBoxOpen: false,
};

export function contextReducer(state, action) {
  switch (action.type) {
    case actionTypes.OPEN_MODAL:
      return {
        ...state,
        isModalOpen: true,
      };
    case actionTypes.CLOSE_MODAL:
      return {
        ...state,
        isModalOpen: false,
      };

    case actionTypes.OPEN_PANEL:
      return {
        ...state,
        isPanelClose: false,
      };
    case actionTypes.CLOSE_PANEL:
      return {
        ...state,
        isPanelClose: true,
      };
    case actionTypes.COLLAPSE_PANEL:
      return {
        ...state,
        isPanelClose: !state.isPanelClose,
      };
    case actionTypes.OPEN_BOX:
      return {
        ...state,
        isBoxCollapsed: true,
      };
    case actionTypes.CLOSE_BOX:
      return {
        ...state,
        isBoxCollapsed: false,
      };
    case actionTypes.COLLAPSE_BOX:
      return {
        ...state,
        isBoxCollapsed: !state.isBoxCollapsed,
      };

    case actionTypes.OPEN_READ_BOX:
      return {
        ...state,
        isAdvancedBoxOpen: false,
        isEditBoxOpen: false,
        isAddBoxOpen: false,
        isBrochureBoxOpen: false, // Ensure only one box is open
        isReadBoxOpen: true,
      };
    case actionTypes.CLOSE_READ_BOX:
      return {
        ...state,
        isReadBoxOpen: false,
      };
    case actionTypes.OPEN_ADVANCED_BOX:
      return {
        ...state,
        isReadBoxOpen: false,
        isEditBoxOpen: false,
        isAddBoxOpen: false,
        isBrochureBoxOpen: false, // Ensure only one box is open
        isAdvancedBoxOpen: true,
      };
    case actionTypes.CLOSE_ADVANCED_BOX:
      return {
        ...state,
        isAdvancedBoxOpen: false,
      };
    case actionTypes.OPEN_EDIT_BOX:
      return {
        ...state,
        isReadBoxOpen: false,
        isAdvancedBoxOpen: false,
        isAddBoxOpen: false,
        isBrochureBoxOpen: false, // Ensure only one box is open
        isEditBoxOpen: true,
      };
    case actionTypes.OPEN_ADD_BOX:
      return {
        ...state,
        isReadBoxOpen: false,
        isAdvancedBoxOpen: false,
        isEditBoxOpen: false,
        isBrochureBoxOpen: false, // Ensure only one box is open
        isAddBoxOpen: true,
      };
    case actionTypes.CLOSE_EDIT_BOX:
      return {
        ...state,
        isEditBoxOpen: false,
      };
    case actionTypes.CLOSE_ADD_BOX:
      return {
        ...state,
        isAddBoxOpen: false,
      };
    case actionTypes.COLLAPSE_READ_BOX:
      return {
        ...state,
        isReadBoxOpen: !state.isReadBoxOpen,
      };

    // Updated cases for brochure box
    case actionTypes.OPEN_BROCHURE_BOX:
      return {
        ...state,
        isReadBoxOpen: false,
        isAdvancedBoxOpen: false,
        isEditBoxOpen: false,
        isAddBoxOpen: false,
        isBrochureBoxOpen: true,
      };
    case actionTypes.CLOSE_BROCHURE_BOX:
      return {
        ...state,
        isBrochureBoxOpen: false,
      };

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}
