import React from "react";
import TextFieldGroup from "../common/TextFieldGroup";
import PropTypes from "prop-types";
import logo from "../../../assets/logo.png";
class RegisterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isContinue: false,
      isSuccess: false,
      accType: "",
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      errors: {},
      isLoading: false,
      invalid: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleClickSellerType = this.handleClickSellerType.bind(this);
    this.handleClickPublisherType = this.handleClickPublisherType.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleClickPublisherType() {
    this.setState({ accType: "publisher", isContinue: true });
  }
  handleClickSellerType() {
    this.setState({ accType: "seller", isContinue: true });
  }

  onSubmit(e) {
    e.preventDefault();

    if (true) {
      this.setState({ errors: {}, isLoading: true });
      this.props.userSignupRequest(this.state).then(
        res => {
          if (res.data.error) {
            this.setState({
              errors: res.data.error,
              isLoading: false
            });
          } else {
            this.setState({ isSuccess: true });
          }
        },
        err => {
          this.setState({
            errors: {},
            isLoading: false
          });
        }
      );
    }
  }

  render() {
    const { errors, isContinue, isSuccess } = this.state;

    let form = (
      <div className="selectRegisterType">
        <a className="navbar-brand" href="/">
          <img src={logo} width="200" alt="logopage" />
        </a>
        <div className="normal-title">Que tipo de cuenta desea crear?</div>
        <div className="row type-container">
          <div className="option-box" onClick={this.handleClickSellerType}>
            Vendedor
          </div>
          <div className="option-box" onClick={this.handleClickPublisherType}>
            Publicitario
          </div>
        </div>
      </div>
    );
    if (isContinue) {
      form = (
        <form className="loginBox" onSubmit={this.onSubmit}>
          <a className="navbar-brand" href="/">
            <img src={logo} width="200" alt="logopage" />
          </a>

          <TextFieldGroup
            error={errors.username}
            label="Username"
            onChange={this.onChange}
            value={this.state.username}
            field="username"
          />

          <TextFieldGroup
            error={errors.email}
            label="Email"
            onChange={this.onChange}
            value={this.state.email}
            field="email"
          />

          <TextFieldGroup
            error={errors.password}
            label="Password"
            onChange={this.onChange}
            value={this.state.password}
            field="password"
            type="password"
          />

          <TextFieldGroup
            error={errors.passwordConfirmation}
            label="Password Confirmation"
            onChange={this.onChange}
            value={this.state.passwordConfirmation}
            field="passwordConfirmation"
            type="password"
          />

          <div className="form-group form-buttons">
            <button
              disabled={this.state.isLoading || this.state.invalid}
              className="btn btn-primary btn-lg"
            >
              Sign up
            </button>
          </div>
        </form>
      );
    }

    if (isSuccess) {
      form = (
        <div className="loginBox">
          <div>
            <i className="far fa-check-circle" />
          </div>
          <div className="title-s-register">Registrado!</div>
          <div className="sub-title-s-register">
            Le hemos enviado un correo para poder verificar su cuenta, por favor
            siga las instrucciones.
          </div>
          <div className="link-s-register">
            <a href="/">Volver</a>
          </div>
        </div>
      );
    }

    return form;
  }
}

RegisterForm.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired
};

export default RegisterForm;
