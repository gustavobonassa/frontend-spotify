import { call, put } from "redux-saga/effects";
import api from "../../services/api";

import { Creators as PlaylistsActions } from "../ducks/playlists";
import { Creators as ErrorActions } from "../ducks/error";
import { actions as toastrActions } from "react-redux-toastr";
import { push } from "connected-react-router";

export function* getPlaylists() {
  try {
    const response = yield call(api.get, "/playlist");
    yield put(PlaylistsActions.getPlaylistsSuccess(response.data.data));
  } catch (err) {
    yield put(ErrorActions.setError("Não foi possivel obter as playlists"));
  }
}

export function* newPlaylist(action) {
  try {
    const response = yield call(api.post, "/playlist", action.payload.data);
    console.log(response);
    yield put(
      toastrActions.add({
        type: "success",
        title: "Playlist criada com sucesso",
        message: "Sua playlist foi criada",
      })
    );
    yield put(push(`/playlists/${response.data.id}`));
  } catch (error) {
    yield put(ErrorActions.setError("Falha ao criar a playlist"));
  }
}
