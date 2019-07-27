import { call, put } from 'redux-saga/effects';
import api from '../../services/api';
import { push } from 'connected-react-router';

import { Creators as SongActions } from '../ducks/song';
import { Creators as ErrorActions } from '../ducks/error';
import { actions as toastrActions } from 'react-redux-toastr';

export function* getSearch(action) {
    try {
        const response = yield call(api.post, `/search`, { search: action.payload.data.search, maxResults: action.payload.data.maxResults });
        yield put(SongActions.getSearchSuccess(response.data));
    } catch (err) {
        yield put(ErrorActions.setError('Não foi possivel fazer a pesquisa'));
    }
}
