import React, { Component } from 'react'
import './Main.css'
import { faUser, faShoppingCart, faBars, faSortDown, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faLinkedin, faInstagram } from "@fortawesome/free-brands-svg-icons";
import CategoryList from '../../components/Customer/CategoryList/CategoryList';
import CartDetailPage from './CartDetailPage/CartDetailPage';

import { BrowserRouter as Router, Switch, Route, Link, NavLink, withRouter, Redirect } from "react-router-dom";
import ProductDetail from './ProductDetail/ProductDetail';
import HomePage from './HomePage/HomePage';
import logo from '../../img/logo.png'
import SearchResult from './SearchResult/SearchResult';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as categoryActions from "../../actions/category";
import * as userActions from "../../actions/user";
import Search from './Search/Search'
import Login from '../../containers/Customer/Login/Login'
import Register from '../../containers/Customer/Register/Register'
import { useSelector } from 'react-redux';
import {  browserHistory } from 'react-router'
//import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
//import configureStore from './../../redux/configureStore'
import ProductCard from '../../components/Customer/ProductCard/ProductCard'
import Shop from '../../containers/Customer/Shop/Shop'
import Profile from '../../containers/Profile/Profile'
import {logout} from '../../actions/user'
import {priceformat } from '../../constants/priceformat'
import Cookie from 'js-cookie';

class Main extends Component {


    constructor(props) {
        super(props);
        this.state = {
            open_dropdown: false,
        }
    }
    componentDidMount() {
     
        const { categoryActionCreators } = this.props;
        const { fetchListCategory } = categoryActionCreators;
        fetchListCategory();

      }
    
    toggleDropDown = () => {
        this.setState(prevState => {
            return {
                open_dropdown: !prevState.open_dropdown
            }
        })
    }
    setDropDown = (b) => {
        this.setState(prevState => {
            return {
                open_dropdown: b
            }
        })
    }
    handleLogout = () =>{
        this.props.logout();
    }

    render() {
      

        const { data } = this.props;
        const checkActive = (match, location) => {
            //some additional logic to verify you are in the home URI
            if (!location) return false;
            const { pathname } = location;
            return pathname === "/";
        }
     
        return (
            
             <div>
                <div className="header">
                    <div className="header__top">
                        <div className="container">
                            <div className="row">
                            <div className='col-lg-2'>
                            <div className='header__logo'>
                                <Link to='/'><img src='https://ebook.vn/images/logo-white.png' alt=''/></Link>
                            </div>

                        </div>
                        <div className='col-lg-4'>
                            <nav className='header__menu'>
                                <ul>
                                    <li>
                                        <div onClick={() => { this.setDropDown(true) }}><NavLink to='/' activeClassName='active' isActive={checkActive}>Home</NavLink></div>
                                    </li>
                                    <li>
                                        <div onClick={() => { this.setDropDown(false) }}><NavLink to='/category' activeClassName='active'>Shop</NavLink></div>
                                    </li>
                                    {/* <li>
                                       <div onClick={() => { this.setDropDown(false) }}><NavLink to='/pages' activeClassName='active'>Pages</NavLink></div>
                                    </li> */}
                                    <li>
                                        <div onClick={() => { this.setDropDown(false) }}><NavLink to='/about' activeClassName='active'>About</NavLink></div>
                                    </li>
                                    <li>
                                        <div onClick={() => { this.setDropDown(false) }}><NavLink to='/contact' activeClassName='active'>Contact</NavLink></div>
                                    </li>
                                </ul>
                            </nav>
                        </div>  
                        <div className='col-lg-5'>
                                 <Search setdd={this.setDropDown}/>
                         </div>
                                <div className="col-lg-1 col-md-1">
                                    <div className="header__top__right">   
                                        <div className="header__top__right__auth">
                                        {
                                       this.props.userSignin ?
                                        <Link className="badge badge-pill"  onClick={() => { this.setDropDown(false) }} to="/profile">Welcome <b>{this.props.userSignin.name} ! </b> </Link> 
                                         :
                                        <Link onClick={() => { this.setDropDown(false) }} to="/login"   class="btn btn-light"> Login</Link>
                                        }
                                      
                                           
                                        </div>
                                        {
                                             this.props.userSignin ? <button onClick={() => {this.handleLogout()}} className = "badge badge-pill badge-warning">LOGOUT</button> : ""
                                        }   
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className='col-lg-3'>
                                <div className="header__cart">
                                    <ul>
                                        <li>
                                            <Link onClick={() => { this.setDropDown(false) }} to="/cartdetail">
                                                <FontAwesomeIcon icon={faShoppingCart} color='while' />
                                              <span>{this.props.cartItemCount}</span>
                                            </Link>

                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Switch>

                    <Route path='/login'   setdd={this.setDropDown} component={Login}>
                  
                    </Route>
                   


                    <Route path='/profile'>
                    <Profile setdd={this.setDropDown} />
                    </Route>

                    <Route path='/register'
                    component={withRouter(Register)} />
                    <Route path='/cartdetail'>
                    <CartDetailPage  setdd={this.setDropDown}/>
                    </Route>
                
                       
                    <Route path='/category'>
                        <Shop  setdd={this.setDropDown}/>
                    </Route>

                    <Route path='/productdetail/:id' component={ProductDetail}/>
                    <Route exact path='/'>
                        <HomePage child_categories={data[0].children_categories} setdd={this.setDropDown}/>
                    </Route>

                    <Route path='/searchrs' component={SearchResult}/>
                </Switch>
                <footer className="footer spad">
                    <div className="container">
                        <div className="row">
                            <div className='col-lg-3'></div>
                            <div className='col-lg-3'></div>
                            <div className='col-lg-3'></div>
                            <div className='col-lg-3'></div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="footer__copyright">
                                    <div className="footer__copyright__text">
                                  
                                        <p>Copyright &copy; 2020 by: Book</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
                </div>
       
        )
    }
}

const mapStateToProps = (state) => {
    return {
      data: state.category.listCategory.data,
    
      userSignin : state.user.userSignin,
      cartItems: state.cart.cart,
      cartItemCount: state.cart.cart.reduce((count, curItem) => {
          return count + curItem.quantity;
      }, 0),
     totalPrice: state.cart.cart.reduce((count, curItem) => {
         return count + ((curItem.price - (curItem.price * (curItem.discount/100))) * curItem.quantity);
     }, 0)
    };
  };
  const mapDispatchToProps = (dispatch) => {
    return {
      categoryActionCreators: bindActionCreators(categoryActions, dispatch),
      userActionCreators: bindActionCreators(userActions, dispatch),
      logout : () => dispatch(logout()) 
      // modalActionCreators: bindActionCreators(modalActions, dispatch),
    };
  };

  export default connect(mapStateToProps, mapDispatchToProps)(Main);


