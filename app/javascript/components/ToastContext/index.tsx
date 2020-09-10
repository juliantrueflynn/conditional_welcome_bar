import React, { useReducer, createContext, useContext } from 'react';
import { Toast } from '@shopify/polaris';

type ToastState = {
  content: string;
};

type ToastDispatch = { type: 'bar/destroy' } | { type: 'reset' };

type Dispatch = (action: ToastDispatch) => void;

const initialState: ToastState = Object.freeze({
  content: '',
});

const toastReducer = (state: ToastState, action: ToastDispatch) => {
  switch (action.type) {
    case 'bar/destroy': {
      return {
        ...state,
        content: 'Welcome bar deleted',
      };
    }
    case 'reset': {
      return initialState;
    }
    default:
      return state;
  }
};

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
