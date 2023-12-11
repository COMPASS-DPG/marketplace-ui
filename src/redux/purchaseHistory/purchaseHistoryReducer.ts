import { TransectionType } from '@/app/purchase-history/page';

import {
  GET_PURCHASE_HISTORY_FAILURE,
  GET_PURCHASE_HISTORY_REQUEST,
  GET_PURCHASE_HISTORY_SUCCESS,
} from './type';

const init = {
  walletBalance: null,
  purchaseHistory: [],
  isLoading: false,
  isError: false,
};

type actionType = {
  type: string;
  payload: {
    walletBalance: number;
    purchaseHistory: TransectionType[];
  };
};

export const purchaseHistoryReducer = (
  state = init,
  { type, payload }: actionType
) => {
  switch (type) {
    case GET_PURCHASE_HISTORY_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case GET_PURCHASE_HISTORY_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        purchaseHistory: payload?.purchaseHistory,
        walletBalance: payload?.walletBalance,
      };
    }
    case GET_PURCHASE_HISTORY_FAILURE: {
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
