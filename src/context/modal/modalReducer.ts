import { ModalState } from './';

type ModalActionType =
  | { type: '[Modal] - Open'; payload: boolean }
  | { type: '[Modal] - SET-ID'; payload: string };

export const ModalReducer = (
  state: ModalState,
  action: ModalActionType
): ModalState => {
  switch (action.type) {
    case '[Modal] - Open':
      return {
        ...state,
        isOpen: action.payload,
      };
    case '[Modal] - SET-ID':
      return {
        ...state,
        id: action.payload,
      };

    default:
      return state;
  }
};
