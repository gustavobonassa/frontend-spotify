import { all, takeLatest } from 'redux-saga/effects';

import { Types as PlaylistsTypes } from '../ducks/playlists';
import { Types as PlaylistDetailsTypes } from '../ducks/playlistDetails';
import { Types as AuthTypes } from '../ducks/auth';
import { Types as SongTypes } from '../ducks/song';

import { signIn, signOut, signUp, inviteUser } from './auth';
import { getPlaylists, newPlaylist } from './playlists';
import { getPlaylistDetails, delSong } from './playlistDetails';
import { getSearch } from './song';

export default function* rootSaga() {
    yield all([
        takeLatest(PlaylistsTypes.GET_REQUEST, getPlaylists),
        takeLatest(PlaylistsTypes.NEW_PLAYLIST_REQUEST, newPlaylist),
        takeLatest(PlaylistDetailsTypes.GET_REQUEST, getPlaylistDetails),

        takeLatest(AuthTypes.SIGN_IN_REQUEST, signIn),
        takeLatest(AuthTypes.SIGN_OUT, signOut),
        takeLatest(AuthTypes.SIGN_UP_REQUEST, signUp),
        takeLatest(AuthTypes.INVITE_USER, inviteUser),

        takeLatest(SongTypes.GET_SEARCH_REQUEST, getSearch),
        takeLatest(PlaylistDetailsTypes.DELETE_SONG, delSong),

    ]);
};
