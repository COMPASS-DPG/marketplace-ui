import axios from 'axios';
import { Dispatch } from 'react';
import { toast } from 'react-toastify';

import {
  GET_SAVE_COURSE_AND_STATUS_FAILURE,
  GET_SAVE_COURSE_AND_STATUS_REQUEST,
  GET_SAVE_COURSE_AND_STATUS_SUCCESS,
  PURCHASE_COURSE_FAILURE,
  PURCHASE_COURSE_REQUEST,
  PURCHASE_COURSE_SUCCESS,
  SAVE_COURSE_FAILURE,
  SAVE_COURSE_REQUEST,
  SAVE_COURSE_SUCCESS,
  UNSAVE_COURSE_FAILURE,
  UNSAVE_COURSE_REQUEST,
  UNSAVE_COURSE_SUCCESS,
} from './type';
import { CourseType } from '../marketplace/marketplaceReducer';

export type requestCourseType = {
  courseId: string;
  bppId?: string;
  title: string;
  description: string;
  credits: number;
  imageLink: string;
  language: string[];
  courseLink: string;
  providerName: string;
  providerId?: string;
  avgRating: number;
  author: string;
  competency: {
    [key: string]: string[];
  };
};

type CourseDescriptionActionTypes = {
  type: string;
  payload?: {
    saveCourseStatus?: boolean;
    purchaseCourseStatus?: boolean;
  };
};

type SingleCourseActionTypes = {
  type: string;
  payload?: {
    saveCourseStatus: boolean;
    purchaseCourseStatus: boolean;
    singleCourse: CourseType;
  };
};

export const removeCourse =
  (userId: string, courseId: string) =>
  (dispatch: Dispatch<CourseDescriptionActionTypes>) => {
    dispatch({ type: UNSAVE_COURSE_REQUEST });
    return axios
      .patch(
        `${process.env.NEXT_PUBLIC_MARKETPLACE_BACKEND_URL}/api/consumer/${userId}/course/unsave`,
        { courseId: courseId }
      )
      .then(() =>
        dispatch({
          type: UNSAVE_COURSE_SUCCESS,
          payload: { saveCourseStatus: false },
        })
      )
      .catch(() => {
        dispatch({ type: UNSAVE_COURSE_FAILURE });
        toast.error('something went wrong');
      });
  };

export const saveACourse =
  (userId: string, payload: requestCourseType) =>
  (dispatch: Dispatch<CourseDescriptionActionTypes>) => {
    dispatch({ type: SAVE_COURSE_REQUEST });
    return axios
      .post(
        `${process.env.NEXT_PUBLIC_MARKETPLACE_BACKEND_URL}/api/consumer/${userId}/course/save`,
        { ...payload, providerId: userId }
      )
      .then(() =>
        dispatch({
          type: SAVE_COURSE_SUCCESS,
          payload: { saveCourseStatus: true },
        })
      )
      .catch(() => {
        dispatch({ type: SAVE_COURSE_FAILURE });
        toast.error('something went wrong');
      });
  };

export const purchasesACourse =
  (userId: string, payload: requestCourseType) =>
  (dispatch: Dispatch<CourseDescriptionActionTypes>) => {
    dispatch({ type: PURCHASE_COURSE_REQUEST });
    return axios
      .post(
        `${process.env.NEXT_PUBLIC_MARKETPLACE_BACKEND_URL}/api/consumer/${userId}/course/purchase`,
        payload
      )
      .then(() =>
        dispatch({
          type: PURCHASE_COURSE_SUCCESS,
          payload: { purchaseCourseStatus: true },
        })
      )
      .catch(() => {
        dispatch({ type: PURCHASE_COURSE_FAILURE });
        toast.error('something went wrong');
      });
  };

// to check course is save or not
const getSaveCourseStatus = async (userId: string, courseId: string) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_MARKETPLACE_BACKEND_URL}/api/consumer/${userId}/course/save/status`,
    { courseId: courseId }
  );
  return res.data.saved;
};

// to check course is purchased or not
const getPurchaseCourseStatus = async (userId: string, courseId: string) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_MARKETPLACE_BACKEND_URL}/api/consumer/${userId}/course/purchase/status`,
    { courseId: courseId }
  );
  return res.data.purchased;
};

export const getSaveCourseAndStatus = (
  userId: string,
  courseId: string,
  singleCourse: CourseType
) => {
  return async (dispatch: Dispatch<SingleCourseActionTypes>) => {
    dispatch({ type: GET_SAVE_COURSE_AND_STATUS_REQUEST });

    try {
      const [savedCourseStatus, purchaseCourseStatus] = await Promise.all([
        getSaveCourseStatus(userId, courseId),
        getPurchaseCourseStatus(userId, courseId),
      ]);

      return dispatch({
        type: GET_SAVE_COURSE_AND_STATUS_SUCCESS,
        payload: {
          saveCourseStatus: savedCourseStatus,
          purchaseCourseStatus: purchaseCourseStatus,
          singleCourse: singleCourse,
        },
      });
    } catch (error) {
      setTimeout(() => {
        dispatch({ type: GET_SAVE_COURSE_AND_STATUS_FAILURE });
        window.location.href = '/error/DataNotFound';
      }, 5000);
    }
  };
};
