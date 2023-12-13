import { marketBackendUrl } from '@root/config';
import axios from 'axios';
import { Dispatch } from 'react';
import { toast } from 'react-toastify';

import {
  FEEDBACK_COURSE_REQUEST,
  FEEDBACK_COURSE_SUCCESS,
  FEEDBACK_FAILURE,
  GET_COMPLETED_COURSE_REQUEST,
  GET_COMPLETED_COURSE_SUCCESS,
  GET_COMPLETED_FAILURE,
} from '@/redux/completedCourse/type';

export type CompletedCourseType = {
  id: string;
  courseInfoId: number;
  becknTransactionId: string;
  consumerId: string;
  feedback: string;
  purchasedAt: string;
  rating: string;
  status: string;
  becknMessageId: string;
  completedAt: string;
  CourseInfo: {
    title: string;
    description: string;
    credits: number;
    imageLink: string;
    language: string[];
    courseLink: string;
    providerName: string;
    author: string;
    avgRating: number;
    bppId: string;
    bppUri: string;
    providerId: string;
    competency: {
      [key: string]: string[];
    };
    courseId: string;
    numberOfPurchases: number;
  };
};

type CompletedCourseActionTypes = {
  type: string;
  payload?: CompletedCourseType[];
};

type FeedbackActionTypes = {
  type: string;
};

type FeedbackPayloadType = {
  rating: number;
  courseInfoId: number;
};

export const giveFeedbackRating =
  (userId: string, payload: FeedbackPayloadType) =>
  (dispatch: Dispatch<FeedbackActionTypes>) => {
    dispatch({ type: FEEDBACK_COURSE_REQUEST });
    return axios
      .patch(
        `${marketBackendUrl}/api/consumer/${userId}/course/feedback`,
        payload
      )
      .then((res) => {
        toast.success(res.data.message, {
          draggable: false,
        });
        dispatch({
          type: FEEDBACK_COURSE_SUCCESS,
        });
      })
      .catch(() => {
        toast.error('something went wrong', {
          draggable: false,
        });
        dispatch({ type: FEEDBACK_FAILURE });
      });
  };

export const getCompletedCourse =
  (userId: string) => (dispatch: Dispatch<CompletedCourseActionTypes>) => {
    dispatch({ type: GET_COMPLETED_COURSE_REQUEST });
    return axios
      .get(`${marketBackendUrl}/api/consumer/${userId}/course/purchases`)
      .then((res) => {
        dispatch({
          type: GET_COMPLETED_COURSE_SUCCESS,
          payload: res?.data?.data.consumerCourses,
        });
      })
      .catch(() => dispatch({ type: GET_COMPLETED_FAILURE }));
  };
