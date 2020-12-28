import React, { Component } from "react";

class RoleItem extends Component {

    onClickDelete = (role) => {
        this.props.onClickDelete(role);
    };

    render() {
        const { role } = this.props;
        const {
            id,
            name
        } = role;
        return ( 
            <tr>
            <td > { id } </td> 
            <td> { name } </td> 
            </tr>
        );
    }
}

export default RoleItem;