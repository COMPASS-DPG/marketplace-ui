import { NotificationType } from '@/app/notifications/page';

import {
  GET_NOTIFICATION_FAILURE,
  GET_NOTIFICATION_REQUEST,
  GET_NOTIFICATION_SUCCESS,
} from './type';

const init = {
  notificationData: [],
  isLoading: false,
  isError: false,
};

export const notificationReducer = (
  state = init,
  { type, payload }: { type: string; payload: NotificationType[] }
) => {
  switch (type) {
    case GET_NOTIFICATION_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case GET_NOTIFICATION_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        notificationData: payload,
      };
    }
    case GET_NOTIFICATION_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    }
    default: {
      return state;
    }
  }
};
