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
    courseLink?: string;
  };
};

type SingleCourseActionTypes = {
  type: string;
  payload?: {
    saveCourseStatus: boolean;
    purchaseCourseStatus: boolean;
    courseLink: string;
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
        toast.error('something went wrong', {
          draggable: false,
        });
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
        toast.error('something went wrong', {
          draggable: false,
        });
      });
  };

// to check course is purchased or not
const handlePurchaseCourseStatus = async (userId: string, courseId: string) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_MARKETPLACE_BACKEND_URL}/api/consumer/${userId}/course/purchase/status`,
    { courseId: courseId }
  );
  return res.data.data;
};

export const getPurchaseCourseStatus = (userId: string, courseId: string) => {
  return async (dispatch: Dispatch<CourseDescriptionActionTypes>) => {
    dispatch({ type: PURCHASE_COURSE_REQUEST });
    try {
      const status = await handlePurchaseCourseStatus(userId, courseId);

      return dispatch({
        type: PURCHASE_COURSE_SUCCESS,
        payload: {
          purchaseCourseStatus: status?.purchased,
          courseLink: status?.courseLink,
        },
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        dispatch({ type: PURCHASE_COURSE_FAILURE });
        toast.error(error?.response?.data?.message, {
          draggable: false,
        });
      }
    }
  };
};

export const purchasesACourse = (
  userId: string,
  payload: requestCourseType
) => {
  return async (dispatch: Dispatch<CourseDescriptionActionTypes>) => {
    dispatch({ type: PURCHASE_COURSE_REQUEST });
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_MARKETPLACE_BACKEND_URL}/api/consumer/${userId}/course/purchase`,
        payload
      );
      const status = await handlePurchaseCourseStatus(
        userId,
        payload?.courseId
      );
      return dispatch({
        type: PURCHASE_COURSE_SUCCESS,
        payload: {
          purchaseCourseStatus: status.purchased,
          courseLink: status.courseLink,
        },
      });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        dispatch({ type: PURCHASE_COURSE_FAILURE });
        toast.error(error?.response?.data?.message, {
          draggable: false,
        });
      }
    }
  };
};

// to check course is save or not
const getSaveCourseStatus = async (userId: string, courseId: string) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_MARKETPLACE_BACKEND_URL}/api/consumer/${userId}/course/save/status`,
    { courseId: courseId }
  );
  return res.data.saved;
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
        handlePurchaseCourseStatus(userId, courseId),
      ]);
      return dispatch({
        type: GET_SAVE_COURSE_AND_STATUS_SUCCESS,
        payload: {
          saveCourseStatus: savedCourseStatus,
          purchaseCourseStatus: purchaseCourseStatus?.purchased,
          courseLink: purchaseCourseStatus?.courseLink,
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
