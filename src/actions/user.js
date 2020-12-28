import * as userConstants from "../constants/user";
import {
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGOUT,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL
} from "../constants/user";
import Axios from "axios";
import Cookie from 'js-cookie';
import {
  toastError,
  toastSuccess
} from '../helpers/toastHelper';
import {
  browserHistory
} from 'react-router';
import store from './../redux/configureStore'
import {
  routerMiddleware,
  push
} from 'react-router-redux'
import history from "../helpers/history";
import {updateProfile} from '../apis/user'



export const signin = (user) => async (dispatch) => {
  dispatch({
    type: USER_SIGNIN_REQUEST,
    payload: user
  });

  try {
    const {
      data
    } = await Axios.post("http://127.0.0.1:8000/api/auth/login", user);


    dispatch({
      type: USER_SIGNIN_SUCCESS,
      payload: data
    });
    if (data.role[0] === 'Admin') {
      history.push('/admin/category')
      window.location.reload();

    } else {
      history.push('/')
      window.location.reload();
;
    }


  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload: error.message
    });
  }
}

export const register = (user) => async (dispatch) => {
  dispatch({
    type: USER_REGISTER_REQUEST,
    payload: user
  });
  try {
    const {
      data
    } = await Axios.post("http://127.0.0.1:8000/api/auth/register", user);
    toastSuccess("Đăng Ký thành công !");
    history.push('/login')
    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data
    });

  } catch (error) {
    toastSuccess("Đăng Ký không thành công !");
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.message
    });
  }
}


export const update = (user, id) => async (dispatch) => {
  console.log(user)
  dispatch({
    type: USER_UPDATE_REQUEST,
    payload: user
  });
  try {
    // const {
    //   data
    // } = await Axios.post("http://127.0.0.1:8000/api/auth/update/" + id, user);

   updateProfile(id,user).then(res => {
     console.log(id)
      const {
        data} = res;
        toastSuccess("Cập Nhật Thông Tin thành công !");
        dispatch({
          type: USER_UPDATE_SUCCESS,
          payload: data
        });
      });

  } catch (error) {
    toastSuccess("Cập Nhật Thông Tin không thành công !");
    dispatch({
      type: USER_UPDATE_FAIL,
      payload: error.message
    });
  }
}


export const logout = () => (dispatch) => {
  Cookie.remove("userInfo");
  dispatch({
    type: USER_LOGOUT
  })
}








export const fetchListUser = (page) => {
  return {
    type: userConstants.FETCH_USER,
    payload: {
      page,
    },
  };
};

export const fetchListUserSuccess = (data) => {
  return {
    type: userConstants.FETCH_USER_SUCCESS,
    payload: {
      data,
    },
  };
};

export const fetchListUserFailed = (error) => {
  return {
    type: userConstants.FETCH_USER_FAILED,
    payload: {
      error,
    },
  };
};

//DELETE
export const deleteUser = (id) => {
  return {
    type: userConstants.DELETE_USER,
    payload: {
      id,
    },
  };
};

export const deleteUserSuccess = (data) => {
  return {
    type: userConstants.DELETE_USER_SUCCESS,
    payload: {
      data,
    },
  };
};

export const deleteUserFailed = (error) => {
  return {
    type: userConstants.DELETE_USER_FAILED,
    payload: {
      error,
    },
  };
};

///----

export const addUser = (
  name,
  phone_number,
  email,
  birthday,
  password,
  address,
  address_id,
  roles
) => {
  return {
    type: userConstants.ADD_USER,
    payload: {
      name,
      phone_number,
      email,
      birthday,
      password,
      address,
      address_id,
      roles,
    },
  };
};

export const addUserSuccess = (data) => {
  return {
    type: userConstants.ADD_USER_SUCCESS,
    payload: {
      data,
    },
  };
};

export const addUserFailed = (error) => {
  return {
    type: userConstants.ADD_USER_FAILED,
    payload: {
      error,
    },
  };
};

export const setUserEditing = (user) => {
  return {
    type: userConstants.SET_USER_EDITING,
    payload: {
      user,
    },
  };
};

export const updateUser = (
  name,
  phone_number,
  email,
  birthday,
  password,
  address,
  address_id,
  roles
) => {
  return {
    type: userConstants.UPDATE_USER,
    payload: {
      name,
      phone_number,
      email,
      birthday,
      password,
      address,
      address_id,
      roles,
    },
  };
};

export const updateUserSuccess = (data) => {
  return {
    type: userConstants.UPDATE_USER_SUCCESS,
    payload: {
      data,
    },
  };
};

export const updateUserFailed = (error) => {
  return {
    type: userConstants.UPDATE_USER_FAILED,
    payload: {
      error,
    },
  };
};