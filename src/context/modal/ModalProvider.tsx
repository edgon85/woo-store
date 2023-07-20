import { FC, useReducer } from 'react';
import { ModalContext, ModalReducer } from './';

export interface ModalState {
  isOpen: boolean;
  id: string;
}

const MODAL_INITIAL_STATE: ModalState = {
  isOpen: false,
  id: '',
};

type Props = {
  children: JSX.Element | JSX.Element[];
};

export const ModalProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(ModalReducer, MODAL_INITIAL_STATE);

  const onOpenModal = (modalId: string) => {
    dispatch({ type: '[Modal] - SET-ID', payload: modalId });
    dispatch({ type: '[Modal] - Open', payload: true });
  };

  const onCloseModal = () => {
    dispatch({ type: '[Modal] - SET-ID', payload: '' });
    dispatch({ type: '[Modal] - Open', payload: false });
  };

  return (
    <ModalContext.Provider
      value={{
        ...state,

        // Methods
        onOpenModal,
        onCloseModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
