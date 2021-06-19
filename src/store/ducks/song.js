export const Types = {
  GET_SEARCH_REQUEST: "song/GET_SEARCH_REQUEST",
  GET_SEARCH_SUCCESS: "song/GET_SEARCH_SUCCESS",
  OPEN_PLAYLIST_MODAL: "song/OPEN_PLAYLIST_MODAL",
  CLOSE_PLAYLIST_MODAL: "song/CLOSE_PLAYLIST_MODAL",
  OPEN_DEL_SONG_MODAL: "song/OPEN_DEL_SONG_MODAL",
  CLOSE_DEL_SONG_MODAL: "song/CLOSE_DEL_SONG_MODAL",
};

const INITIAL_STATE = {
  search: [],
  playlistModalOpen: false,
  delSongModalOpen: false,
  loading: false,
};

export default function song(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Types.OPEN_PLAYLIST_MODAL:
      return { ...state, playlistModalOpen: true };
    case Types.CLOSE_PLAYLIST_MODAL:
      return { ...state, playlistModalOpen: false };
    case Types.GET_SEARCH_REQUEST:
      return { ...state, loading: true };
    case Types.GET_SEARCH_SUCCESS:
      return { ...state, search: action.payload.data, loading: false };
    case Types.OPEN_DEL_SONG_MODAL:
      return { ...state, delSongModalOpen: true };
    case Types.CLOSE_DEL_SONG_MODAL:
      return { ...state, delSongModalOpen: false };
    default:
      return state;
  }
}

export const Creators = {
  openModal: () => ({
    type: Types.OPEN_PLAYLIST_MODAL,
  }),
  closeModal: () => ({
    type: Types.CLOSE_PLAYLIST_MODAL,
  }),
  openDelSongModal: () => ({
    type: Types.OPEN_DEL_SONG_MODAL,
  }),
  closeDelSongModal: () => ({
    type: Types.CLOSE_DEL_SONG_MODAL,
  }),

  getSearchRequest: (data) => ({
    type: Types.GET_SEARCH_REQUEST,
    payload: { data },
  }),
  getSearchSuccess: (data) => ({
    type: Types.GET_SEARCH_SUCCESS,
    payload: { data },
  }),
};
