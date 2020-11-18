import * as orderConstants from "../constants/order";
import {
  toastError,
  toastSuccess
} from '../helpers/toastHelper'
import {
  submitOrder
} from "../apis/order";
import {
  userOrder
} from "../apis/order";


export const fetchListOrder = (page) => {
  return {
    type: orderConstants.FETCH_ORDER,
    payload: {
      page,
    },
  };
};

export const deleteListCart = () => {
  toastSuccess("Bạn Đã Đặt Hàng Thành Công! ")
  return {
    type: orderConstants.DELETE_LIST_CART,
  };
};



export const fetchListOrderSuccess = (data) => {
  return {
    type: orderConstants.FETCH_ORDER_SUCCESS,
    payload: {
      data,
    },
  };
};

export const fetchListOrderFailed = (error) => {
  return {
    type: orderConstants.FETCH_ORDER_FAILED,
    payload: {
      error,
    },
  };
};
//===

