import React, { Component } from "react";
import { connect } from "react-redux";
import {logout} from '../../../actions/user'


class Header extends Component {
  

  handleLogout = () =>{
    this.props.logout();
}
  render() {
    const emailLocal = localStorage.getItem('email-login');
    const emailLength = emailLocal.length
    const email = emailLocal.slice(0, emailLength - 10);
    return (
      <nav className="sb-topnav navbar navbar-expand navbar-dark">
        <a className="navbar-brand" href="index.html">
          Ebook Shop
        </a>
     
        {/* Navbar Search*/}
        <form className="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
          <div className="input-group text-white" >
          Xin chào,
            {/* <input
              className="form-control"
              type="text"
              placeholder="Search for..."
              aria-label="Search"
              aria-describedby="basic-addon2"
            />
            <div className="input-group-append">
              <button className="btn btn-primary" type="button">
                <i className="fas fa-search" />
              </button>
            </div> */
             email
            }
          </div>
        </form>
        {/* Navbar*/}
        <ul className="navbar-nav ml-auto ml-md-0">
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              id="userDropdown"
              href="/#"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i className="fas fa-user fa-fw" />
            </a>
            <div
              className="dropdown-menu dropdown-menu-right"
              aria-labelledby="userDropdown"
            >
              <div className="dropdown-divider" />
              <button onClick={() => {this.handleLogout()}} className="dropdown-item" >
                Logout
              </button>
            </div>
          </li>
        </ul>
      </nav>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    userSignin : state.user.userSignin,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    logout : () => dispatch(logout()) 
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
