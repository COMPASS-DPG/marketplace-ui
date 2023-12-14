import { marketBackendUrl } from '@root/config';
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
    `${marketBackendUrl}/api/consumer/${userId}/course/saved`
  );
  return data.data.data.consumerCourses;
};
export const getOngoingCourses = async (userId: string) => {
  const data = await axios.get(
    `${marketBackendUrl}/api/consumer/${userId}/course/ongoing`
  );
  return data.data.data.consumerCourses;
};
export const getMostPopularCourses = async () => {
  // api is not correct for now
  const data = await axios.get(
    `${marketBackendUrl}/api/consumer/course/popular?limit=10&offset=0`
  );
  return data.data.data.response;
};
export const getRecommendedCourses = async () => {
  // api is not correct for now
  const data = await axios.get(
    `${marketBackendUrl}/api/consumer/course/recommended`
  );
  return data.data.data.consumerCourses;
};

export const getMarketplaceCourses = (userId: string) => {
  return async (dispatch: Dispatch<marketplaceActionTypes>) => {
    dispatch({ type: MARKETPLACE_REQUEST });

    try {
      const [
        // recommendedCoursesResponse,
        mostPopularCoursesResponse,
        ongoingCoursesResponse,
        savedCourseResponse,
      ] = await Promise.all([
        // getRecommendedCourses(),
        getMostPopularCourses(),
        getOngoingCourses(userId),
        getSavedCourse(userId),
      ]);

      return dispatch({
        type: MARKETPLACE_SUCCESS,
        payload: {
          mostPopularCourses: mostPopularCoursesResponse,
          recommendedCourses: [],
          savedCourses: savedCourseResponse,
          ongoingCourses: ongoingCoursesResponse,
        },
      });
    } catch (error) {
      setTimeout(() => {
        dispatch({ type: MARKETPLACE_FAILURE });
        window.location.href = '/error/DataNotFound';
      }, 5000);
    }
  };
};
