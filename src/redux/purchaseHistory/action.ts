import axios from 'axios';
import { Dispatch } from 'react';

import { ConsumerCourse, TransectionType } from '@/app/purchase-history/page';

import {
  GET_PURCHASE_HISTORY_FAILURE,
  GET_PURCHASE_HISTORY_REQUEST,
  GET_PURCHASE_HISTORY_SUCCESS,
} from './type';

type PurchaseActionTypes = {
  type: string;
  payload?: {
    walletBalance: number | null;
    purchaseHistory: TransectionType[];
  };
};

export const fetchCredits = async (userId: string) => {
  const data = await axios.get(
    `http://localhost:4000/api/consumer/${userId}/wallet/credits`
  );
  return data.data.data.credits;
};
export const fetchPurchaseHistory = async (userId: string) => {
  const data = await axios.get(
    `http://localhost:4000/api/consumer/${userId}/course/purchases`
  );
  return data.data.data.consumerCourses;
};

export const getPurchaseHistory = (userId: string, userId2: string) => {
  return async (dispatch: Dispatch<PurchaseActionTypes>) => {
    dispatch({ type: GET_PURCHASE_HISTORY_REQUEST });

    try {
      const [creditsResponse, purchaseHistoryResponse] = await Promise.all([
        fetchCredits(userId),
        fetchPurchaseHistory(userId2),
      ]);
      const transectionObjArray = purchaseHistoryResponse.map(
        (item: ConsumerCourse) => {
          return {
            id: item?.id,
            title: item?.CourseInfo?.title,
            credits: item?.CourseInfo?.credits,
            author: item?.CourseInfo?.providerName,
            purchasedAt: item?.purchasedAt,
          };
        }
      );
      dispatch({
        type: GET_PURCHASE_HISTORY_SUCCESS,
        payload: {
          walletBalance: creditsResponse,
          purchaseHistory: transectionObjArray,
        },
      });
    } catch (error) {
      dispatch({ type: GET_PURCHASE_HISTORY_FAILURE });
    }
  };
};
