import React, { useState, createContext } from 'react';

type Props = {
  children: React.ReactNode;
};

type ActionState = {
  readonly type: string;
  readonly title: string;
  readonly onAction?: Function;
};

type ContextProps = {
  readonly toggleModal: (action: ActionState | null) => void;
  readonly modalAction: ActionState;
};

const INITIAL_MODAL_ACTION_STATE: ActionState = Object.freeze({
  type: '',
  title: '',
});

const INITIAL_OVERLAY_STATE: ContextProps = Object.freeze({
  toggleModal: (): void => {
    // empty return
  },
  modalAction: INITIAL_MODAL_ACTION_STATE,
});

export const OverlaysContext = createContext(INITIAL_OVERLAY_STATE);

const OverlaysContextProvider: React.FC<Props> = ({ children }) => {
  const [modalAction, setModalAction] = useState(INITIAL_MODAL_ACTION_STATE);

  const contextValues: ContextProps = {
    toggleModal: (action: ActionState | null): void => {
      setModalAction(action || INITIAL_MODAL_ACTION_STATE);
    },
    modalAction,
  };

  return (
    <OverlaysContext.Provider value={contextValues}>
      <>{children}</>
    </OverlaysContext.Provider>
  );
};

export default OverlaysContextProvider;
