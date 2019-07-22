import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import Main from '../pages/Main';
import SignIn from '../pages/Auth/SignIn';
import SignUp from '../pages/Auth/SignUp';
import history from './history';

import Private from './private';
import Guest from './guest';

const Routes = () => (
    <ConnectedRouter history={history}>
        <Switch>
            <Guest path="/signin" component={SignIn} />
            <Guest path="/signup" component={SignUp} />
            <Private path="/" component={Main} />
        </Switch>

    </ConnectedRouter>
);

export default Routes
