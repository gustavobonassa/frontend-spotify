export const Types = {
    GET_REQUEST: 'playlistDetails/GET_REQUEST',
    GET_SUCCESS: 'playlistDetails/GET_SUCCESS',
    DELETE_SONG: 'song/DELETE_SONG',
    OPEN_DEL_MODAL: 'playlist/OPEN_DEL_MODAL',
    CLOSE_DEL_MODAL: 'playlist/CLOSE_DEL_MODAL',
    DELETE_PLAYLIST: 'playlist/DELETE_PLAYLIST'
};

const INITIAL_STATE = {
    data: [],
    loading: false,
    delModalOpen: false
};

export default function playlistDetails(state = INITIAL_STATE, action) {
    switch (action.type) {
        case Types.GET_REQUEST:
            return { ...state, loading: true };
        case Types.GET_SUCCESS:
            return { ...state, loading: false, data: action.payload.data };
        case Types.OPEN_DEL_MODAL:
            return { ...state, delModalOpen: true };
        case Types.CLOSE_DEL_MODAL:
            return { ...state, delModalOpen: false };
        default:
            return state;
    }
}

export const Creators = {
    getPlaylistDetailsRequest: id => ({
        type: Types.GET_REQUEST,
        payload: { id }
    }),

    getPlaylistDetailsSuccess: data => ({
        type: Types.GET_SUCCESS,
        payload: { data },
    }),

    deleteSong: (id, plid) => ({
        type: Types.DELETE_SONG,
        payload: { id, plid }
    }),
    openDelModal: () => ({
        type: Types.OPEN_DEL_MODAL,
    }),
    closeDelModal: () => ({
        type: Types.CLOSE_DEL_MODAL,
    }),
    deletePlaylist: id => ({
        type: Types.DELETE_PLAYLIST,
        payload: { id }
    }),
};
