import React, { useReducer, createContext, useContext } from 'react';
import { Toast } from '@shopify/polaris';
import toastReducer, { Dispatch, initialState } from '../../state/toast';

const ToastContextDispatch = createContext<Dispatch | undefined>(undefined);

export const useToastDispatchContext = () => {
  const context = useContext(ToastContextDispatch);

  if (context === undefined) {
    throw new Error('useToastDispatchContext must be used within provider');
  }

  return context;
};

type Props = {
  children: React.ReactNode;
};

export const ToastContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(toastReducer, initialState);

  return (
    <ToastContextDispatch.Provider value={dispatch}>
      {children}
      {!!state.content && (
        <Toast
          content={state.content}
          onDismiss={() => dispatch({ type: 'reset' })}
        />
      )}
    </ToastContextDispatch.Provider>
  );
};

export default ToastContextProvider;
