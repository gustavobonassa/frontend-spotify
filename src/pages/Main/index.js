import React from 'react';
//import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import Player from '../../components/Player';
import ErrorBox from '../../components/ErrorBox';

import Browse from '../browse';
import Playlist from '../playlist';
import AddPlaylist from '../AddPlaylist';
import Search from '../Search';

import { Wrapper, Container, Content } from '../../styles/components';

const Main = () => (

    <Wrapper>
        <Container>
            <Sidebar />
            <Content>
                <ErrorBox />
                <Header />
                <Switch>
                    <Route exact path="/" component={Browse} />
                    <Route path="/playlists/:id" component={Playlist} />
                    <Route path="/search/:id?" component={Search} />
                    <Route path="/newplaylist" component={AddPlaylist} />
                    <Route path="*" render={() => (<div>Página não encontrada</div>)} />
                </Switch>
            </Content>
        </Container>
        <Player />
    </Wrapper>
);

export default Main;
