import React from 'react';
import {connect} from 'react-redux'
import {userSignOut} from 'actions/Auth';
import IntlMessages from 'util/IntlMessages';
import axios from 'axios';

class UserInfoPopup extends React.Component {
  render() {
    return (
      <div>
        <div className="user-profile">
          <img className="user-avatar border-0 size-40 rounded-circle"
               src={`${axios.defaults.baseURL}user/img/${JSON.parse(localStorage.getItem('UserData')).userimage}`}
               alt="User"/>
          <div className="user-detail ml-2">
            <h4 className="user-name mb-0">{JSON.parse(localStorage.getItem('UserData')).name}</h4>
            <small>{JSON.parse(localStorage.getItem('UserData')).system===1?(
              <p>Administrator</p>
            ):(<p>System User</p>)}</small>
          </div>
        </div>
      
        <span className="jr-link dropdown-item text-muted" onClick={() => {
          //this.props.userSignOut()
          localStorage.removeItem("token");
          this.props.history.push("/signin");
        }}>
          <i className="zmdi zmdi-sign-in zmdi-hc-fw mr-1"/>
          <IntlMessages id="popup.logout"/>
        </span>
      </div>
    );
  }
}

export default connect(null, {userSignOut})(UserInfoPopup);


