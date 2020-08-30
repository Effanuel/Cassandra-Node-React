import { MODAL_OPEN, MODAL_CLOSE } from "../actions/actionTypes";
import { Actions } from "../actions/modalActions";
import { ModalState } from "../models/state";

const initialState = {
  showModal: null,
  selectedUserId: null,
  selectedAccountId: null,
};

export default (state: ModalState = initialState, action: Actions): any => {
  switch (action.type) {
    case MODAL_OPEN:
      return {
        ...state,
        showModal: action.payload.showModal,
        selectedUserId: action.payload.selectedUserId,
        selectedAccountId: action.payload.selectedAccountId,
      };
    case MODAL_CLOSE:
      return { ...state, ...initialState };
    default:
      return state;
  }
};
