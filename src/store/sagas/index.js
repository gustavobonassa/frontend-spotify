import { all, takeLatest } from 'redux-saga/effects';

import { Types as PlaylistsTypes } from '../ducks/playlists';
import { Types as PlaylistDetailsTypes } from '../ducks/playlistDetails';
import { Types as AuthTypes } from '../ducks/auth';

import { signIn, signOut, signUp } from './auth';
import { getPlaylists } from './playlists';
import { getPlaylistDetails } from './playlistDetails';

export default function* rootSaga(){
    yield all([
        takeLatest(PlaylistsTypes.GET_REQUEST, getPlaylists),
        takeLatest(PlaylistDetailsTypes.GET_REQUEST, getPlaylistDetails),
        takeLatest(AuthTypes.SIGN_IN_REQUEST, signIn),
        takeLatest(AuthTypes.SIGN_OUT, signOut),
        takeLatest(AuthTypes.SIGN_UP_REQUEST, signUp),
    ]);
};
