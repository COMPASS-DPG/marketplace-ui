import axios from 'axios';
import { Dispatch } from 'react';
import { toast } from 'react-toastify';

import {
  GET_SAVE_COURSE_STATUS_FAILURE,
  GET_SAVE_COURSE_STATUS_REQUEST,
  GET_SAVE_COURSE_STATUS_SUCCESS,
  PURCHASE_COURSE_FAILURE,
  PURCHASE_COURSE_REQUEST,
  PURCHASE_COURSE_SUCCESS,
  REMOVE_COURSE_FAILURE,
  REMOVE_COURSE_REQUEST,
  REMOVE_COURSE_SUCCESS,
  SAVE_COURSE_FAILURE,
  SAVE_COURSE_REQUEST,
  SAVE_COURSE_SUCCESS,
} from './type';

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
  payload?: SingleCourseType;
};

export const removeCourse =
  (userId: string, courseId: number) =>
  (dispatch: Dispatch<CourseDescriptionActionTypes>) => {
    dispatch({ type: REMOVE_COURSE_REQUEST });
    return axios
      .patch(
        `http://localhost:4000/api/consumer/${userId}/course/${courseId}/unsave`
      )
      .then((res) =>
        dispatch({ type: REMOVE_COURSE_SUCCESS, payload: res.data.data })
      )
      .catch(() => {
        dispatch({ type: REMOVE_COURSE_FAILURE });
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

export const getSaveCourseStatus =
  (userId: string, courseId: number) =>
  (dispatch: Dispatch<SingleCourseActionTypes>) => {
    dispatch({ type: GET_SAVE_COURSE_STATUS_REQUEST });
    return axios
      .get(
        `http://localhost:4000/api/consumer/${userId}/course/${courseId}/save`
      )
      .then((res) =>
        dispatch({
          type: GET_SAVE_COURSE_STATUS_SUCCESS,
          payload: res.data.saved,
        })
      )
      .catch(() => {
        dispatch({ type: GET_SAVE_COURSE_STATUS_FAILURE });
        toast.error('something went wrong');
      });
  };
