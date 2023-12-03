import axios from 'axios';
import { Dispatch } from 'react';

import { CourseType } from './marketplaceReducer';
import {
  MARKETPLACE_FAILURE,
  MARKETPLACE_REQUEST,
  MARKETPLACE_SUCCESS,
} from './type';

type marketplaceActionTypes = {
  type: string;
  payload?: {
    mostPopularCourses: CourseType[];
    recommendedCourses: CourseType[];
    savedCourses: CourseType[];
    ongoingCourses: CourseType[];
  };
};

export const getSavedCourse = async (userId: string) => {
  const data = await axios.get(
    `http://localhost:4000/api/consumer/${userId}/course/saved`
  );
  return data.data.data.consumerCourses;
};
export const getOngoingCourses = async (userId: string) => {
  const data = await axios.get(
    `http://localhost:4000/api/consumer/${userId}/course/ongoing`
  );
  return data.data.data.consumerCourses;
};
export const getMostPopularCourses = async (userId: string) => {
  // api is not correct for now
  const data = await axios.get(
    `http://localhost:4000/api/consumer/${userId}/course/saved`
  );
  return data.data.data.consumerCourses;
};
export const getRecommendedCourses = async (userId: string) => {
  // api is not correct for now
  const data = await axios.get(
    `http://localhost:4000/api/consumer/${userId}/course/saved`
  );
  return data.data.data.consumerCourses;
};

export const getMarketplaceCourses = (userId: string) => {
  return async (dispatch: Dispatch<marketplaceActionTypes>) => {
    dispatch({ type: MARKETPLACE_REQUEST });

    try {
      const [ongoingCoursesResponse, savedCourseResponse] = await Promise.all([
        // getRecommendedCourses(userId),
        // getMostPopularCourses(userId),
        getOngoingCourses(userId),
        getSavedCourse(userId),
      ]);

      return dispatch({
        type: MARKETPLACE_SUCCESS,
        payload: {
          mostPopularCourses: [],
          recommendedCourses: [],
          savedCourses: savedCourseResponse,
          ongoingCourses: ongoingCoursesResponse,
        },
      });
    } catch (error) {
      dispatch({ type: MARKETPLACE_FAILURE });
      window.location.href = '/error/DataNotFound';
    }
  };
};