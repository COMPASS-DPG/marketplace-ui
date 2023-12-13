import { marketBackendUrl } from '@root/config';
import axios from 'axios';
import { Dispatch } from 'react';

import {
  SEARCH_COURSES_FAILURE,
  SEARCH_COURSES_REQUEST,
  SEARCH_COURSES_RESET,
  SEARCH_COURSES_SUCCESS,
} from './type';
import { CourseType } from '../marketplace/marketplaceReducer';

type SearchCoursesActionTypes = {
  type: string;
  payload?: CourseType[];
};

export const getSearchCourses =
  (searchText: string) =>
  async (dispatch: Dispatch<SearchCoursesActionTypes>) => {
    dispatch({ type: SEARCH_COURSES_REQUEST });

    // when ever user search it will first reset initial value to empty
    dispatch({
      type: SEARCH_COURSES_RESET,
    });
    try {
      const response = await axios.get(
        `${marketBackendUrl}/api/consumer/course/search?searchInput=${searchText}`
      );
      {
        dispatch({
          type: SEARCH_COURSES_SUCCESS,
          payload: response?.data?.data?.searchResponse?.courses,
        });
      }

      if (response?.data?.data?.searchResponse?.messageId) {
        for (let i = 0; i < 5; i++) {
          const res = await axios.get(
            `https://2dbf-2409-40c4-fa-9e8a-819b-9379-f26f-afde.ngrok-free.app/courses/poll/${response?.data?.data?.searchResponse?.messageId}`
          );

          dispatch({ type: SEARCH_COURSES_SUCCESS, payload: res.data });
          await new Promise((resolve) => setTimeout(resolve, 5000)); // 5-second interval
        }
      }
    } catch (error) {
      dispatch({ type: SEARCH_COURSES_FAILURE });
    }
  };
