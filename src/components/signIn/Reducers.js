import {
    REGISTER_SUCCESS,

    CHANGE_EMAIL_SIGNIN,
    CHANGE_PASSWORD_SIGNIN,

    SIGNIN_PENDING,
    SIGNIN_FAILED,
} from './Constants'

const initialStateSignin = {
    email: '',
    password: '',
    signingInMessage: '',
    isPending: false,
    registeredMessage: '',
}

export const signInRED = (state = initialStateSignin, action = {}) => {
    switch (action.type) {
        case REGISTER_SUCCESS:
            return Object.assign({}, state, { registeredMessage: action.payload })

        case CHANGE_EMAIL_SIGNIN:
            return Object.assign({}, state, { email: action.payload })
        case CHANGE_PASSWORD_SIGNIN:
            return Object.assign({}, state, { password: action.payload })

        case SIGNIN_PENDING: //signingInMessage: 'Signing In...'
            return Object.assign({}, state, { signingInMessage: '', registeredMessage: '', isPending: true })
        case SIGNIN_FAILED:
            return Object.assign({}, state, { signingInMessage: action.payload, isPending: false })

        default:
            return state;
    }
}