export const Types= {
    GET_SEARCH_REQUEST: 'addSong/GET_SEARCH_REQUEST',
    GET_SEARCH_SUCCESS: 'addSong/GET_SEARCH_SUCCESS',
    OPEN_PLAYLIST_MODAL: 'addSong/OPEN_PLAYLIST_MODAL',
    CLOSE_PLAYLIST_MODAL: 'addSong/CLOSE_PLAYLIST_MODAL',
};

const INITIAL_STATE = {
    search: [],
    playlistModalOpen: false
};

export default function addSong(state = INITIAL_STATE, action) {
    switch (action.type) {
        case Types.OPEN_PLAYLIST_MODAL:
            return { ...state, playlistModalOpen: true };
        case Types.CLOSE_PLAYLIST_MODAL:
            return { ...state, playlistModalOpen: false };
        case Types.GET_SEARCH_SUCCESS:
            return { ...state, search: action.payload.data };
        default:
            return state;
    }
}

export const Creators = {
    openModal: () =>({
        type: Types.OPEN_PLAYLIST_MODAL,
    }),
    closeModal: () =>({
        type: Types.CLOSE_PLAYLIST_MODAL,
    }),
    getSearchRequest: (data) => ({
        type: Types.GET_SEARCH_REQUEST,
        payload: { data }
    }),
    getSearchSuccess: (data) => ({
        type: Types.GET_SEARCH_SUCCESS,
        payload: { data }
    }),
};
