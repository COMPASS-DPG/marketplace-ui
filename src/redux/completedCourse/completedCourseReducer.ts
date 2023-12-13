import { CompletedCourseType } from '@/redux/completedCourse/action';
import {
  GET_COMPLETED_COURSE_REQUEST,
  GET_COMPLETED_COURSE_SUCCESS,
  GET_COMPLETED_FAILURE,
} from '@/redux/completedCourse/type';

const init = {
  courses: [],
  isLoading: false,
  isError: false,
};

type actionType = {
  type: string;
  payload: CompletedCourseType[];
};

export const completedCourseReducer = (
  state = init,
  { type, payload }: actionType
) => {
  switch (type) {
    case GET_COMPLETED_COURSE_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case GET_COMPLETED_COURSE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        courses: payload,
      };
    }
    case GET_COMPLETED_FAILURE: {
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
