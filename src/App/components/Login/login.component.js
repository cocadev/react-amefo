import React from "react";
import { ToastsContainer, ToastsStore } from "react-toasts";
import isEmpty from "lodash/isEmpty";
import { connect } from "react-redux";
import { login } from "../../Auth/authActions";
import PropTypes from "prop-types";
import logo from "../../../assets/logo.png";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleContinueClick = this.handleContinueClick.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);

    this.state = {
      isContinueIn: false,
      identifier: "",
      password: "",
      errors: {},
      isLoading: false
    };
  }

  validateInput(data) {
    let errors = {};

    if (!data.identifier) {
      errors.identifier = "This field is required";
    }

    if (!data.password) {
      errors.password = "This field is required";
    }

    return {
      errors,
      isValid: isEmpty(errors)
    };
  }

  isValid() {
    const { errors, isValid } = this.validateInput(this.state);

    if (!isValid) {
      this.setState({ errors });
    }

    return isValid;
  }

  handleContinueClick() {
    this.setState({ isContinueIn: true });
  }

  handleLoginClick(e) {
    e.preventDefault();
    if (true) {
      this.setState({ errors: {}, isLoading: true });
      this.props
        .login(this.state)
        .then(
          res => {
            this.props.history.push("/");
          },
          err => {
            this.setState({
              errors: {
                identifier:
                  "Invalid credentials check your password and username/email"
              },
              password: "",
              isLoading: false,
              isContinueIn: false
            });
          }
        )
        .catch(err => {
          console.log(err);
          console.log("error");
          this.setState({
            errors: {
              identifier:
                "Invalid credentials check your password and username/email"
            },
            password: "",
            isLoading: false,
            isContinueIn: false
          });
        });
    }
  }
  handleEmailChange(e) {
    this.setState({ identifier: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }
  render() {
    const isContinueIn = this.state.isContinueIn;
    let formLogin;

    if (isContinueIn) {
      formLogin = (
        <div className="container">
          <div className="background-sl" />

          <a className="navbar-brand" href="/">
            <img src={logo} width="200" alt="logopage" />
          </a>
          <div className="login-box-title">
            <div>
              <h2 className="login-title">Ahora, tu password!</h2>
            </div>
            <form>
              <div className="group">
                <input
                  type="password"
                  name="password"
                  onChange={this.handlePasswordChange}
                  value={this.state.password}
                  required
                />
                <span className="highlight" />
                <span className="bar" />

                <label>Password</label>
              </div>
            </form>
          </div>
          <button className="btn button-login" onClick={this.handleLoginClick}>
            Login
          </button>
          <ToastsContainer store={ToastsStore} />
        </div>
      );
    } else {
      formLogin = (
        <div className="container">
          <div className="background-sl" />

          <a className="navbar-brand" href="/">
            <img src={logo} width="200" alt="logopage" />
          </a>
          <div className="login-box-title">
            <div>
              <h2 className="login-title">
                ¡Hola! Ingresá tu e‑mail o usuario
              </h2>
            </div>
            <form>
              <div className="group">
                <input
                  name="email"
                  onChange={this.handleEmailChange}
                  type="text"
                  value={this.state.identifier}
                  required
                />
                <span className="highlight" />
                <span className="bar" />
                <label>Email</label>
              </div>
            </form>
            {this.state.errors && (
              <span className="help-block">{this.state.errors.identifier}</span>
            )}
          </div>
          <button
            className="btn button-login"
            onClick={this.handleContinueClick}
          >
            Continue
          </button>
          <div>
            <a href="/register" className="aCreateAcc">
              Create account
            </a>
          </div>
        </div>
      );
    }
    return (
      <div>
        <div className="container">
          <div className="loginBox">{formLogin}</div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired
};

export default connect(
  null,
  { login }
)(Login);
