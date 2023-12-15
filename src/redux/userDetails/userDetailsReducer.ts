import { UserDetailsType } from './action';
import {
  USER_DETAILS_FAILURE,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
} from './type';

const init = {
  userDetails: {},
  isLoading: false,
  isError: false,
};

type actionType = {
  type: string;
  payload: UserDetailsType;
};

export const userDetailsReducer = (
  state = init,
  { type, payload }: actionType
) => {
  switch (type) {
    case USER_DETAILS_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case USER_DETAILS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        userDetails: payload,
      };
    }
    case USER_DETAILS_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }
    default: {
      return state;
    }
  }
};
