import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as AuthActions } from '../../store/ducks/auth'
import { Container, User } from './styles';

class Header extends Component {
    static propTypes = {
        signOut: PropTypes.func.isRequired
    }
    render(){
        const { signOut } = this.props;
        //console.log(user)
        return (
            <Container>
                <div>
                </div>
                {/*<Search>
                    <input placeholder="Search" />
                </Search>*/}
                <div>
                    <User>
                        <img src={this.props.user.avatar || "https://avatars2.githubusercontent.com/u/26508215?s=460&v=4"} alt="Avatar" />
                        {this.props.user.username}
                    </User>
                    <button onClick={signOut}>
                        SAIR
                    </button>

                </div>
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
