import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as AuthActions } from '../../store/ducks/auth'
import { Container, Search, User } from './styles';

class Header extends Component {
    render(){
        const {signOut} = this.props;
        return (
            <Container>
                <Search>
                    <input placeholder="Search" />
                </Search>

                <User>
                    <img src="https://avatars2.githubusercontent.com/u/26508215?s=460&v=4" alt="Avatar" />
                    Gustavo Bonassa
                </User>
                <button onClick={signOut}>
                    SAIR
                </button>
            </Container>
        )
    }
}
const mapDispatchToProps = dispatch =>
    bindActionCreators(AuthActions, dispatch);

export default connect(null, mapDispatchToProps)(Header);
