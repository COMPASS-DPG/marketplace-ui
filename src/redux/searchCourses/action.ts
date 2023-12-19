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
        let counter = 0;
        const intervalId = setInterval(async () => {
          const res = await axios.get(
            `${marketBackendUrl}/api/consumer/course/search/poll/${response?.data?.data?.searchResponse?.messageId}`
          );
          if (Array.isArray(res.data.data.courses.data)) {
            dispatch({
              type: SEARCH_COURSES_SUCCESS,
              payload: res.data.data.courses.data,
            });
          }
          counter++;
          if (counter >= 5) {
            clearInterval(intervalId); // Stop the interval after 5 iterations
          }
        }, 5000); // 5-second interval
      }
    } catch (error) {
      dispatch({ type: SEARCH_COURSES_FAILURE });
    }
  };
