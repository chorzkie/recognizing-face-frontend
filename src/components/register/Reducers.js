import {
    CHANGE_NAME_REG,
    CHANGE_EMAIL_REG,
    CHANGE_PASSWORD_REG,

    REGISTER_PENDING,
    REGISTER_FAILED,
} from './Constants'

const initialStateRegister = {
    name: '',
    email: '',
    password: '',
    registeringMessage: '',
    isPending: false,
}

export const registerRED = (state = initialStateRegister, action = {}) => {
    switch (action.type) {
        case CHANGE_NAME_REG:
            return Object.assign({}, state, { name: action.payload })
        case CHANGE_EMAIL_REG:
            return Object.assign({}, state, { email: action.payload })
        case CHANGE_PASSWORD_REG:
            return Object.assign({}, state, { password: action.payload })

        case REGISTER_PENDING: //registeringMessage: 'Registering...'
            return Object.assign({}, state, { registeringMessage: '', isPending: true })
        case REGISTER_FAILED:
            return Object.assign({}, state, { registeringMessage: action.payload, isPending: false })

        default:
            return state;
    }
}