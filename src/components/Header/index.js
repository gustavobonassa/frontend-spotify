import React, { Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as AuthActions } from "../../store/ducks/auth";
import { Container, User } from "./styles";

import Input from "../Input";
import history from "../../routes/history";

class Header extends Component {
  static propTypes = {
    signOut: PropTypes.func.isRequired,
  };
  state = {
    search: "",
  };

  handleSubmit(e) {
    e.preventDefault();
    history.push(`/search?q=${this.state.search}`);
  }

  render() {
    const { signOut } = this.props;
    console.log(history);
    return (
      <Container>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <Input
            placeholder="buscar musica no youtube"
            style={{
              height: 30,
              fontSize: 12,
            }}
            onChange={(e) => this.setState({ search: e.target.value })}
            value={this.state.search}
          />
        </form>
        <div className="logout">
          <User>
            <img
              src={
                this.props.user.avatar ||
                "https://avatars2.githubusercontent.com/u/26508215?s=460&v=4"
              }
              alt="Avatar"
            />
            {this.props.user.username}
          </User>
          <button onClick={signOut}>SAIR</button>
        </div>
      </Container>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(AuthActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);
