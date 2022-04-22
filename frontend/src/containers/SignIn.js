import React from "react";
// import {Link} from 'react-router-dom'
// import {connect} from 'react-redux';
import TextField from "@material-ui/core/TextField";
// import IconButton from '@material-ui/core/IconButton';
import Button from "@material-ui/core/Button";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import IntlMessages from "util/IntlMessages";
// import {Redirect} from "react-router-dom";
import axios from "axios";
import "./loginstylecustom.css";
//backdrop
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/styles";
import CustomSignUp from './CustomSignUp';

const styles = (theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
});

class SignIn extends React.Component {
  constructor() {
    super();
    this.state = {
      open: false,
      signFlag: false,
    };
  }
  signUp = (e) => {
    console.log("sign up clicked");
    this.setState({ signFlag: true });
    console.log("sign up flag", this.state.signFlag);
  };
  handleClose = (e)=>{
    this.setState({ signFlag: false });
  };
  
  handlSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: this.userName,
      password: this.password,
    };

    this.setState({ open: true });
    axios
      .post("api/login", data)
      .then((res) => {
        this.setState({ open: false });
        NotificationManager.success(
          <IntlMessages id="notification.successMessage" />,
          <IntlMessages id="notification.titleHere" />
        );

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("UserData", JSON.stringify(res.data.user));

        if (res.data.user.system === 1) {
          this.props.history.push("app/dashboard/crypto");
        } else {
          this.props.history.push("app/dashboard/intranet");
        }
      })
      .catch((err) => {
        this.setState({ open: false });
        NotificationManager.error(
          <IntlMessages id="notification.errorMessage" />,
          <IntlMessages id="notification.titleHere" />
        );
      });
  };

  render() {
    const { classes } = this.props;
    return (
      <>
        <CustomSignUp key="customSignup" open={this.state.signFlag} onChangeD={this.handleClose.bind(this)}/>
        <Backdrop className={classes.backdrop} open={this.state.open}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <div className="app-login-container d-flex justify-content-center align-items-center animated slideInUpTiny animation-duration-3">
          <div className="app-login-main-content" style={{ height: 'auto' }}>
            <div className="app-logo-content d-flex justify-content-center d-flex align-items-center">
              <div className="slick-slide-item login-brand-image" style={{width: 'auto'}}>
                <img
                  src="/images/System_logo.png"
                  className="img-thumbnail rounded" style={{padding:'none', backgroundColor:'transparent', border: "1px solid transparent"}}
                  alt="Responsive"
                />
              </div>
              <div></div>

              {/* <div className="slick-slide-item login-brand-image">
                <img src="/images/General layout.png" className="img-thumbnail rounded" alt="Responsive" />
              </div> */}
            </div>
            <div className="app-login-content">
                <div className="app-login-header mb-4">
                  <h1>Login To System</h1>
                </div>
                <div className="app-login-form">
                  <form onSubmit={this.handlSubmit}>
                    <fieldset>
                      <TextField
                        label="Email"
                        fullWidth
                        onChange={(e) => (this.userName = e.target.value)}
                        margin="normal"
                        className="mt-1 my-sm-3"
                      />
                      <TextField
                        type="password"
                        label={<IntlMessages id="appModule.password" />}
                        fullWidth
                        onChange={(e) => (this.password = e.target.value)}
                        margin="normal"
                        className="mt-1 my-sm-3"
                      />

                      <div className="mb-3 mt-3 d-flex align-items-center">
                        <Button variant="contained" color="primary" type="submit" className="mr-3">
                          Login
                      </Button>
                        <Button variant="contained" color="primary" onClick={e => this.signUp(this)}>
                          Request for Sign up
                      </Button>
                      </div>
                    </fieldset>
                  </form>
                </div>
              </div>
              

          </div>
        </div>
        <NotificationContainer />
      </>
    );
  }
}

export default withStyles(styles)(SignIn);
