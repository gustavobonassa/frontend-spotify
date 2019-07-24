import { call, put } from 'redux-saga/effects';
import api from '../../services/api';

import { Creators as addSongActions } from '../ducks/addSong';
import { Creators as ErrorActions } from '../ducks/error';

export function* getSearch(action) {
    try{
        const response = yield call(api.post, `/search`, { search: action.payload.data.search, maxResults: action.payload.data.maxResults });
        yield put(addSongActions.getSearchSuccess(response.data));
    }catch (err) {
        yield put(ErrorActions.setError('Não foi possivel fazer a pesquisa'));
    }
}
