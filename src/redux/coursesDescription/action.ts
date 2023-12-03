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
  courseId: number;
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

export type SingleCourseType = {
  id: number;
  title: string;
  description: string;
  courseLink: string;
  imgLink: string;
  credits: number;
  language: string[];
  duration: number;
  competency: {
    [key: string]: string[];
  };
  author: string;
  avgRating: number;
  updatedAt: string;
  providerName: string;
  numOfUsers: number;
  providerId: string;
};

type CourseDescriptionActionTypes = {
  type: string;
  payload?: requestCourseType;
};

type SingleCourseActionTypes = {
  type: string;
  payload?: {
    status: boolean;
    singleCourse: CourseType;
  };
};

export const removeCourse =
  (userId: string, courseId: number) =>
  (dispatch: Dispatch<CourseDescriptionActionTypes>) => {
    dispatch({ type: UNSAVE_COURSE_REQUEST });
    return axios
      .patch(
        `http://localhost:4000/api/consumer/${userId}/course/${courseId}/unsave`
      )
      .then((res) =>
        dispatch({ type: UNSAVE_COURSE_SUCCESS, payload: res.data.data })
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
      .post(`http://localhost:4000/api/consumer/${userId}/course/save`, payload)
      .then((res) =>
        dispatch({ type: SAVE_COURSE_SUCCESS, payload: res.data.data })
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
        `http://localhost:4000/api/consumer/${userId}/course/purchase`,
        payload
      )
      .then((res) =>
        dispatch({ type: PURCHASE_COURSE_SUCCESS, payload: res.data.data })
      )
      .catch(() => {
        dispatch({ type: PURCHASE_COURSE_FAILURE });
        toast.error('something went wrong');
      });
  };

export const getSaveCourseAndStatus =
  (userId: string, courseId: number, singleCourse: CourseType) =>
  (dispatch: Dispatch<SingleCourseActionTypes>) => {
    dispatch({ type: GET_SAVE_COURSE_AND_STATUS_REQUEST });
    return axios
      .get(
        `http://localhost:4000/api/consumer/${userId}/course/${courseId}/save`
      )
      .then((res) =>
        dispatch({
          type: GET_SAVE_COURSE_AND_STATUS_SUCCESS,
          payload: {
            status: res.data.saved,
            singleCourse: singleCourse,
          },
        })
      )
      .catch(() => {
        dispatch({ type: GET_SAVE_COURSE_AND_STATUS_FAILURE });
        toast.error('something went wrong');
      });
  };
