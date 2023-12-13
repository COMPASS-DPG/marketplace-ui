import { marketBackendUrl } from '@root/config';
import axios from 'axios';
import { Dispatch } from 'react';

import { NotificationType } from '@/app/notifications/page';

import {
  GET_NOTIFICATION_FAILURE,
  GET_NOTIFICATION_REQUEST,
  GET_NOTIFICATION_SUCCESS,
} from './type';

type NotificationActionTypes = {
  type: string;
  payload?: NotificationType[];
};

export const getAllNotifications =
  (userId: string) => (dispatch: Dispatch<NotificationActionTypes>) => {
    dispatch({ type: GET_NOTIFICATION_REQUEST });
    axios
      .get(`${marketBackendUrl}/api/consumer/${userId}/notifications`)
      .then((res) =>
        dispatch({
          type: GET_NOTIFICATION_SUCCESS,
          payload: res.data.data.notifications,
        })
      )
      .catch(() => dispatch({ type: GET_NOTIFICATION_FAILURE }));
  };
