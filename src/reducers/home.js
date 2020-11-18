import { toastError } from '../helpers/toastHelper';
import * as homeConstants from './../constants/home';

const initialState = {
  listHome: [],
  homeEditing: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case homeConstants.FETCH_HOME: {
      return {
        ...state,
        listHome: [],
      };
    }
    case homeConstants.FETCH_HOME_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        listHome: data,
      };
    }
    case homeConstants.FETCH_HOME_FAILED: {
      const { error } = action.payload;
      toastError(error);
      return {
        ...state,
        listHome: [],
      };
    }
    default:
      return state;
  }
};

export default reducer;
