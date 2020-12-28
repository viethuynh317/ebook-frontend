import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "./../../actions/user";
import UserItem from "../../components/UserItem";
import * as modalActions from "./../../actions/modal";
import UserForm from "../UserForm";

class User extends Component {
  componentDidMount() {
    const { userActionCreators } = this.props;
    const { fetchListUser } = userActionCreators;
    fetchListUser(1);
  }

  openForm = () => {
    const { modalActionCreators, userActionCreators } = this.props;
    //const { setTaskEditing } = userActionCreators;
    // setTaskEditing(null);
    const {
      showModal,
      changeModalTitle,
      changeModalContent,
    } = modalActionCreators;
    showModal();
    changeModalTitle("Thêm mới user");
    changeModalContent(<UserForm />);
  };

  showModalEditUser = (user) => {
    const { userActionCreators, modalActionCreators } = this.props;
    const { setUserEditing } = userActionCreators;
    setUserEditing(user);
    const {
      showModal,
      changeModalTitle,
      changeModalContent,
    } = modalActionCreators;
    showModal();
    changeModalTitle("Cập nhật user");
    changeModalContent(<UserForm />);
  };

  showModalDeleteUser = (user) => {
    const { modalActionCreators } = this.props;
    const {
      showModal,
      hideModal,
      changeModalTitle,
      changeModalContent,
    } = modalActionCreators;
    showModal();
    changeModalTitle("Xóa công việc");
    changeModalContent(
      <div>
        <div className="modal-body"> Bạn chắc chắn muốn xóa {user.name}</div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={hideModal}
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => this.handleDeleteUser(user)}
          >
            ĐỒNG Ý
          </button>
        </div>
      </div>
    );
  };

  handleDeleteUser(user) {
    const { id } = user;
    const { userActionCreators } = this.props;
    const { deleteUser } = userActionCreators;
    deleteUser(id);
  }

  renderUser = () => {
    let data = this.props.data.data;
    
    console.log(data)

    if (data === undefined) {
      data = [];
    }

    
    let xhtml = null;
    xhtml = data.map((user, index) => {
      return (
        <UserItem
          key={index}
          user={user}
          onClickDelete={this.showModalDeleteUser}
          onClickEdit={this.showModalEditUser}
        />
      );
    });
    return xhtml;
  };


  renderPage = () => {
    let xhtml = null;
    const totalPage = [];
    for (let i = 1; i <= this.props.data.last_page; i++) {
      totalPage.push(i);
    }
    xhtml = totalPage.map((index) => {
      return (
        <li key={index} className="page-item">
          <button
            className="page-link"
            name="page"
            onClick={(e) => {
              this.handlePaginate(index);
            }}
          >
            {index}
          </button>
        </li>
      );
    });
    return xhtml;
  };

  handlePaginate = (page) => {
    console.log(page);
    const { userActionCreators } = this.props;
    const { fetchListUser } = userActionCreators;
    fetchListUser(page);
  };


  render() {
    return (
      <main>
        <div className="container-fluid">
          <ol className="breadcrumb mb-2">
            <li className="breadcrumb-item">
              <a href="index.html">Admin</a>
            </li>
            <li className="breadcrumb-item active">User</li>
          </ol>

          <div className="card mb-2" />
          <button
            type="button"
            className="btn btn-primary mb-2"
            onClick={this.openForm}
          >
            <i className="fas fa-user-plus"></i>
          </button>
          <div className="card mb-2">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead className="thead-dark">
                    <tr>
                      <th>id</th>
                      <th>name</th>
                      <th>email</th>
                      <th>birthday</th>
                      <th>role</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>{this.renderUser()}</tbody>
                </table>
              </div>
              <nav aria-label="Page navigation example">
                <ul className="pagination">
                  <li className="page-item">
                    <button
                      className="page-link"
                      onClick={(e) => {
                        this.handlePaginate(
                          parseInt(this.props.data.current_page) - 1
                        );
                      }}
                    >
                      <span aria-hidden="true">«</span>
                    </button>
                  </li>

                  {this.renderPage()}

                  <li className="page-item">
                    <a
                      className="page-link"
                      onClick={(e) => {
                        this.handlePaginate(
                          parseInt(this.props.data.current_page) + 1
                        );
                      }}
                    >
                      <span aria-hidden="true">»</span>
                    </a>
                  </li>
                </ul>
              </nav>

            </div>
          </div>
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.user.listUser,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    userActionCreators: bindActionCreators(userActions, dispatch),
    modalActionCreators: bindActionCreators(modalActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
