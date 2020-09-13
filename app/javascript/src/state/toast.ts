export type ToastState = {
  content: string;
};

export type ToastDispatch = {type: 'bar/update' | 'bar/destroy' | 'reset'};

export type Dispatch = (action: ToastDispatch) => void;

export const initialState: ToastState = Object.freeze({
  content: '',
});

const toastReducer = (state: ToastState, action: ToastDispatch): ToastState => {
  switch (action.type) {
    case 'bar/update':
      return {content: 'Welcome bar updated'};
    case 'bar/destroy':
      return {content: 'Welcome bar deleted'};
    case 'reset':
      return initialState;
    default:
      return state;
  }
};

export default toastReducer;
