import { combineReducers } from "redux";
import uiReducer from "./ui";
import categoryReducer from "./category";
import homeReducer from "./home";
import loginReducer from "./login";
import productReducer from "./product";
import modalReducer from './modal';
import roleReducer from './role';
import orderReducer from './order';
import producerReducer from './producer';
import cartReducer from './cart';
import statusReducer from './status';
import {userReducer, userSigninReducer,userRegisterReducer, userUpdateReducer} from "./user";
import reviewReducer from './review';
import productstatusReducer from './productstatus';
import reportReducer from './report';
import orderstatusReducer from "./orderstatus";





const rootReducer = combineReducers({
  ui: uiReducer,
 
  home: homeReducer,
  login: loginReducer,
  product:productReducer,
  user:userReducer,
  review:reviewReducer,
  userSignin : userSigninReducer,
  userRegister : userRegisterReducer,
  userUpdate : userUpdateReducer,
  modal: modalReducer,
  role:roleReducer,
  order:orderReducer,
  producer: producerReducer,
  cart : cartReducer,
  status:statusReducer,
  productstatus:productstatusReducer,
  report:reportReducer,
  orderstatus: orderstatusReducer,
});

export default rootReducer;
