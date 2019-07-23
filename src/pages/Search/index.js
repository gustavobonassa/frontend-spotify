import React, { Component } from 'react';

import { Container } from './styles';

class Search extends Component {
    state = {
        search: '',
    };
    handleSubmit = (e) => {
        e.preventDefault();

        const { search } = this.state;

        //signInRequest(email, password);
    }
    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }
    render(){
        const { search } = this.state;
        return (
            <Container>
                <h1>Buscar música do youtube</h1>
                <form>
                    <input type="text" name="search" placeholder="Search" value={search} onChange={this.handleInputChange}/>
                </form>
            </Container>
        )
    }
}

export default Search;
