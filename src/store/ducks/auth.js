export const Types= {
    SIGN_UP_REQUEST: 'auth/SIGN_UP_REQUEST',
    SIGN_IN_REQUEST: 'auth/SIGN_IN_REQUEST',
    SIGN_IN_SUCCESS: 'auth/SIGN_IN_SUCCESS',
    SIGN_OUT: 'auth/SIGN_OUT',
};

const INITIAL_STATE = {
    signedIn: !!localStorage.getItem('@Omni:token'),
    token: localStorage.getItem('@Omni:token') || null,
    roles: [],
    permissions: []
};

export default function auth(state = INITIAL_STATE, action) {
    switch (action.type) {
        case Types.SIGN_IN_SUCCESS:
            return { ...state, signedIn: true, token: action.payload.token };
        case Types.SIGN_OUT:
            return { ...state, signedIn: false, token: null };
        default:
            return state;
    }
}

export const Creators = {
    signInRequest: (email,password) => ({
        type: Types.SIGN_IN_REQUEST,
        payload: { email,password }
    }),
    signUpRequest: (data) => ({
        type: Types.SIGN_UP_REQUEST,
        payload: { data }
    }),

    signInSuccess: token => ({
        type: Types.SIGN_IN_SUCCESS,
        payload: { token },
    }),
    signOut: () => ({
        type: Types.SIGN_OUT
    })
};
