import {
  GET_SAVE_COURSE_STATUS_FAILURE,
  GET_SAVE_COURSE_STATUS_REQUEST,
  GET_SAVE_COURSE_STATUS_SUCCESS,
  REMOVE_COURSE_FAILURE,
  REMOVE_COURSE_REQUEST,
  REMOVE_COURSE_SUCCESS,
  SAVE_COURSE_FAILURE,
  SAVE_COURSE_REQUEST,
  SAVE_COURSE_SUCCESS,
} from './type';

const init = {
  status: null,
  isLoading: false,
  isError: false,
};

type actionType = {
  type: string;
  payload: boolean;
};

export const courseDescriptionReducer = (
  state = init,
  { type, payload }: actionType
) => {
  switch (type) {
    case GET_SAVE_COURSE_STATUS_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case GET_SAVE_COURSE_STATUS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        status: payload,
      };
    }
    case GET_SAVE_COURSE_STATUS_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }
    case SAVE_COURSE_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case SAVE_COURSE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case SAVE_COURSE_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }
    case REMOVE_COURSE_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case REMOVE_COURSE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
      };
    }
    case REMOVE_COURSE_FAILURE: {
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
