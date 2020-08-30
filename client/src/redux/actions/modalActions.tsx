import * as constants from "./actionTypes";

interface ModalOpen {
  type: typeof constants.MODAL_OPEN;
  payload: any;
}

interface ModalClose {
  type: typeof constants.MODAL_CLOSE;
}

export type Actions = ModalOpen | ModalClose;

export const modalOpen = (payload: any): any => ({
  type: constants.MODAL_OPEN,
  payload: payload,
});

export const modalClose = (): any => ({
  type: constants.MODAL_CLOSE,
});
