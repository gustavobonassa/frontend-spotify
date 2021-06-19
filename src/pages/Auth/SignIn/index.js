import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as AuthActions } from "../../../store/ducks/auth";

import Button from "../../../styles/components/Button";
import { Container, SignForm } from "../styles";

class SignIn extends Component {
  static propTypes = {
    signInRequest: PropTypes.func.isRequired,
  };
  state = {
    email: "",
    password: "",
  };
  handleSubmit = (e) => {
    e.preventDefault();
    console.log("teste")
    const { email, password } = this.state;
    const { signInRequest } = this.props;

    signInRequest(email, password);
  };
  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    const { email, password } = this.state;
    return (
      <Container>
        <SignForm onSubmit={(e) => this.handleSubmit(e)}>
          <h1>LOGIN</h1>

          <span>E-MAIL</span>
          <input
            type="email"
            name="email"
            value={email}
            onChange={this.handleInputChange}
          />

          <span>SENHA</span>
          <input
            type="password"
            name="password"
            value={password}
            onChange={this.handleInputChange}
          />

          <Button size="big" onClick={(e) => this.handleSubmit(e)}>
            Entrar
          </Button>
          <Link to="/signup">Criar conta</Link>
        </SignForm>
      </Container>
    );
  }
}

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(AuthActions, dispatch);

export default connect(null, mapDispatchToProps)(SignIn);
