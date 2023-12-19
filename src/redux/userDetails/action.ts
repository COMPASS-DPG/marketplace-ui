import { marketBackendUrl } from '@root/config';
import axios from 'axios';
import { Dispatch } from 'react';

import {
  USER_DETAILS_FAILURE,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
} from './type';

export type UserDetailsType = {
  consumerId: string;
  name: string;
  emailId: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
  credits: 4960;
  numberOfPurchasedCourses: 2;
};

type UserDetailsActionTypes = {
  type: string;
  payload?: UserDetailsType;
};

export const getUserDetails =
  (userId: string) => (dispatch: Dispatch<UserDetailsActionTypes>) => {
    dispatch({ type: USER_DETAILS_REQUEST });
    axios
      .get(`${marketBackendUrl}/api/consumer/${userId}`)
      .then((res) =>
        dispatch({
          type: USER_DETAILS_SUCCESS,
          payload: res?.data?.data?.consumer,
        })
      )
      .catch(() => dispatch({ type: USER_DETAILS_FAILURE }));
  };
