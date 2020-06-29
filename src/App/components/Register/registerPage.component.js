import React from "react";
import RegisterForm from "./register.component";
import { connect } from "react-redux";
import { userSignupRequest } from "../../Auth/signupActions";
import { addFlashMessage } from "../../Auth/flashMessages.js";
import PropTypes from "prop-types";

class registerPage extends React.Component {
  render() {
    const { userSignupRequest, addFlashMessage, history } = this.props;
    return (
      <div className="container">
        <div className="background-sl" />

        <RegisterForm
          userSignupRequest={userSignupRequest}
          addFlashMessage={addFlashMessage}
          history={history}
        />
      </div>
    );
  }
}

registerPage.propTypes = {
  userSignupRequest: PropTypes.func.isRequired,
  addFlashMessage: PropTypes.func.isRequired
};

export default connect(
  null,
  { userSignupRequest, addFlashMessage }
)(registerPage);
