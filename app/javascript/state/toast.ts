export type ToastState = {
  content: string;
};

export type ToastDispatch = { type: 'bar/destroy' } | { type: 'reset' };

export type Dispatch = (action: ToastDispatch) => void;

export const initialState: ToastState = Object.freeze({
  content: '',
});

const toastReducer = (state: ToastState, action: ToastDispatch): ToastState => {
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

export default toastReducer;
