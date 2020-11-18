import * as userConstants from './../constants/user';
import { toastError,toastSuccess } from '../helpers/toastHelper';
import Cookie from 'js-cookie';
import { routerMiddleware, push } from 'react-router-redux'
import { browserHistory } from 'react-router'

var userInfo = Cookie.getJSON("userInfo") || null;

const initialState = {
    listUser:[{}],
    userEditing: null,
    userSignin: userInfo,
    userUpdate : userInfo,
    page:''
  };

   function userSigninReducer(state = {}, action) {
    switch (action.type) {
      case userConstants.USER_SIGNIN_REQUEST:
        return { loading: true };
      case userConstants.USER_SIGNIN_SUCCESS:
        toastSuccess("Đăng nhập thành công !");
        Cookie.set('userInfo', JSON.stringify(action.payload));
        return { loading: false, userInfo: action.payload };
      case userConstants.USER_SIGNIN_FAIL:
        toastSuccess("Tài Khoản Hoặc Mật Khẩu Sai !");
        return { loading: false, error: action.payload };
      case userConstants.USER_LOGOUT:
        localStorage.removeItem('cartItems');
        browserHistory.push('/')
        toastSuccess("Đăng Xuất Thành Công !");
        window.location.reload(); 
        return {};
      default: return state;
    }
  }


  function userRegisterReducer(state = {}, action) {
    switch (action.type) {
      case userConstants.USER_REGISTER_REQUEST:
        return { loading: true };
      case userConstants.USER_REGISTER_SUCCESS:

        return { loading: false, userInfo: action.payload };
      case userConstants.USER_REGISTER_FAIL:

        return { loading: false, error: action.payload };
      default: return state;
    }
  }


  function userUpdateReducer(state = {}, action) {
    switch (action.type) {
      case userConstants.USER_UPDATE_REQUEST:
        return { loading: true };
    

      case userConstants.USER_UPDATE_SUCCESS:
        userInfo.name = action.payload.name;
        userInfo.phone_number = action.payload.phone_number;
        userInfo.address = action.payload.address;
        userInfo.address_id = action.payload.address_id;
        Cookie.set('userInfo', JSON.stringify(userInfo));
        return { loading: false };
      case userConstants.USER_UPDATE_FAIL:

        return { loading: false, error: action.payload };
      default: return state;
    }
  }




  
  export  {userReducer,userSigninReducer,userUpdateReducer, userRegisterReducer };