export const Types = {
    SIGN_UP_REQUEST: 'auth/SIGN_UP_REQUEST',
    SIGN_IN_REQUEST: 'auth/SIGN_IN_REQUEST',
    SIGN_IN_SUCCESS: 'auth/SIGN_IN_SUCCESS',
    SIGN_OUT: 'auth/SIGN_OUT',
    INVITE_USER: 'invite/INVITE_USER',
};

const INITIAL_STATE = {
    signedIn: !!localStorage.getItem('@Omni:token'),
    token: localStorage.getItem('@Omni:token') || null,
    user: JSON.parse(localStorage.getItem('@Omni:user')) || null,
    roles: [],
    permissions: []
};

export default function auth(state = INITIAL_STATE, action) {
    switch (action.type) {
        case Types.SIGN_IN_SUCCESS:
            return { ...state, signedIn: true, token: action.payload.data.token, user: action.payload.data.user };
        case Types.SIGN_OUT:
            return { ...state, signedIn: false, token: null, user: null };
        default:
            return state;
    }
}

export const Creators = {
    signInRequest: (email, password) => ({
        type: Types.SIGN_IN_REQUEST,
        payload: { email, password }
    }),
    signUpRequest: (data) => ({
        type: Types.SIGN_UP_REQUEST,
        payload: { data }
    }),

    signInSuccess: data => ({
        type: Types.SIGN_IN_SUCCESS,
        payload: { data },
    }),
    signOut: () => ({
        type: Types.SIGN_OUT
    }),
    inviteUser: (email) => ({
        type: Types.INVITE_USER,
        payload: { email }
    }),
};
