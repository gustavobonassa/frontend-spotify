import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as AuthActions } from '../../store/ducks/auth'
import { Container, User } from './styles';

import Button from '../../styles/components/Button';
import Modal from '../Modal';
import Input from '../Input';

class Header extends Component {
    static propTypes = {
        signOut: PropTypes.func.isRequired
    }
    state = {
        invite: false,
        email: ''
    }
    handleInvite = () => {
        this.setState({
            invite: !this.state.invite
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();

        this.props.inviteUser(this.state.email);
        this.handleInvite();
    }
    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    render() {
        const { signOut } = this.props;
        //console.log(user)
        return (
            <Container>
                <div>
                    {/* <Button onClick={this.handleInvite}>Convidar</Button> */}
                    <Input
                        placeholder="buscar"
                        style={{
                            height: 30,
                            fontSize: 12
                        }}
                    />
                </div>
                <div className="logout">
                    <User>
                        <img src={this.props.user.avatar || "https://avatars2.githubusercontent.com/u/26508215?s=460&v=4"} alt="Avatar" />
                        {this.props.user.username}
                    </User>
                    <button onClick={signOut}>
                        SAIR
                    </button>

                </div>
                {this.state.invite && (
                    <Modal>
                        <form onSubmit={this.handleSubmit}>
                            <h1>Convidar amigos para o site</h1>
                            <input type="email" name="email" placeholder="E-mail" value={this.state.email} onChange={this.handleInputChange} />
                            <Button type="submit">Enviar</Button>
                            <Button onClick={this.handleInvite} color="gray" size="small">Fechar</Button>
                        </form>
                    </Modal>
                )}
            </Container>
        )
    }
}
const mapStateToProps = state => ({
    user: state.auth.user
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(AuthActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);
