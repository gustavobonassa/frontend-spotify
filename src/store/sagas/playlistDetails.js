import { call, put } from "redux-saga/effects";
import api from "../../services/api";
import { push } from "connected-react-router";

import { Creators as PlaylistDetailsActions } from "../ducks/playlistDetails";
import { Creators as ErrorActions } from "../ducks/error";
import { actions as toastrActions } from "react-redux-toastr";

export function* getPlaylistDetails(action) {
  try {
    const response = yield call(
      api.get,
      `/playlist/${action.payload.id}?_embed=songs`
    );

    yield put(PlaylistDetailsActions.getPlaylistDetailsSuccess(response.data));
  } catch (err) {
    yield put(
      ErrorActions.setError("Não foi possivel obter os detalhes da playlist")
    );
  }
}
export function* delSong(action) {
  try {
    yield call(api.delete, `/song/${action.payload.id}`);
    const response = yield call(
      api.get,
      `/playlist/${action.payload.plid}?_embed=songs`
    );
    yield put(
      toastrActions.add({
        type: "success",
        title: "Música deletada com sucesso",
        message: "Música deletada",
      })
    );

    yield put(PlaylistDetailsActions.getPlaylistDetailsSuccess(response.data));
  } catch (err) {
    yield put(
      toastrActions.add({
        type: "error",
        title: "Não foi possivel deletar a música",
        message: "A música não foi deletada",
      })
    );
  }
}
export function* delPlaylist(action) {
  try {
    yield call(api.delete, `/playlist/${action.payload.id}`);
    yield put(
      toastrActions.add({
        type: "success",
        title: "Playlist deletada com sucesso",
        message: "Playlist deletada",
      })
    );

    yield put(push("/"));
  } catch (err) {
    yield put(
      toastrActions.add({
        type: "error",
        title: "Não foi possivel deletar a playlist",
        message: "A playlist não foi deletada",
      })
    );
  }
}
