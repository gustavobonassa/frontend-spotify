import { call, put, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { actions as toastrActions } from 'react-redux-toastr';
import api from '../../services/api';

import { Creators as AuthActions } from '../ducks/auth';

export function* signIn(action) {
    try {
        const response = yield call(api.post, 'sessions', { email: action.payload.email, password: action.payload.password });

        localStorage.setItem('@Spoti:token', response.data.token);
        localStorage.setItem('@Spoti:user', JSON.stringify(response.data.user));
        yield put(AuthActions.signInSuccess(response.data));
        yield put(push('/'));
    } catch (err) {
        yield put(toastrActions.add({
            type: 'error',
            title: 'Falha no login',
            message: 'Verifique seu e-mail/senha!'
        }))
    }
}

export function* signOut() {
    localStorage.removeItem('@Spoti:token');
    localStorage.removeItem('@Spoti:user');

    yield put(push('/signin'))
}

export function* signUp(action) {
    try {
        const response = yield call(api.post, 'users', action.payload.data);

        localStorage.setItem('@Spoti:token', response.data.token);
        localStorage.setItem('@Spoti:user', JSON.stringify(response.data.user));

        yield put(AuthActions.signInSuccess(response.data.token));
        yield put(push('/'));
    } catch (err) {
        yield put(toastrActions.add({
            type: 'error',
            title: 'Falha no cadastro',
            message: 'Você precisa de um e-mail convidado ou nome já usado'
        }))
    }
}

export function* getPermissions() {
    const team = yield select(state => state.teams.active);
    const signedIn = yield select(state => state.auth.signedIn);

    if (!signedIn || !team) {
        return;
    }

    const response = yield call(api.get, 'permissions');

    const { roles, permissions } = response.data

    yield put(AuthActions.getPermissionsSuccess(roles, permissions));
}

export function* inviteUser(action) {
    try {
        yield call(api.post, 'invites', { invites: [action.payload.email] });

        yield put(toastrActions.add({
            type: 'success',
            title: 'Convite enviado',
            message: 'Convite enviado com sucesso'
        }))
    } catch (error) {
        yield put(toastrActions.add({
            type: 'error',
            title: 'Erro na operação',
            message: 'Houve um erro, tente novamente',
        }))
    }
}
