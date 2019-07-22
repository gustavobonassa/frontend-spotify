import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as AuthActions } from '../../../store/ducks/auth';

import Button from '../../../styles/components/Button';
import { Container, SignForm } from '../styles';


class SignUp extends Component {
    static propTypes = {
        signUpRequest: PropTypes.func.isRequired
    }
    state = {
        avatar: null,
        username: '',
        email: '',
        password: '',
        password_confirmation: '',
    };
    handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();

        data.append('avatar', this.state.avatar)
        data.append('username', this.state.username)
        data.append('email', this.state.email)
        data.append('password', this.state.password)
        data.append('password_confirmation', this.state.password_confirmation)

        const { signUpRequest } = this.props;

        signUpRequest(data);
    }
    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleImageChange = e => {
        this.setState({ avatar: e.target.files[0] });
    }
    render(){
        const { email, password, username, password_confirmation } = this.state;
        return(
            <Container>
                <SignForm onSubmit={this.handleSubmit}>
                    <h1>Criar conta</h1>

                    <input type="file" name="avatar" onChange={this.handleImageChange} />
                    <span>NOME</span>
                    <input name="username" value={username} onChange={this.handleInputChange}/>

                    <span>E-MAIL</span>
                    <input type="email" name="email" value={email} onChange={this.handleInputChange}/>

                    <span>SENHA</span>
                    <input type="password" name="password" value={password} onChange={this.handleInputChange}/>

                    <span>DIGITE NOVAMENTE SUA SENHA</span>
                    <input type="password" name="password_confirmation" value={password_confirmation} onChange={this.handleInputChange}/>

                    <Button size="big" type="submit">Criar</Button>
                    <Link to="/signin">Já tenho conta</Link>
                </SignForm>
            </Container>
        )
    }
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(AuthActions, dispatch);

export default connect(null, mapDispatchToProps)(SignUp);
