import storage from 'redux-persist/lib/storage'

import {
    CHANGE_ROUTE,

    CHANGE_URL_INPUT,

    SIGNIN_SUCCESS_LOAD_USER,

    PREDICT_FACE_PENDING,
    PREDICT_FACE_FAILED,

    FACE_MARKINGS,
    NO_FACE_MARKINGS,
    CLEAR_MARKINGS,

    UPDATE_SUBMISSION_PENDING,
    UPDATE_SUBMISSION_SUCCESS,
    UPDATE_SUBMISSION_FAILED,
} from './Constants'




const initialMainState = {
    route: 'signin',
    isSignedIn: false,

    imageUrl: '',
    box: [],
    predictionStatus: '',
    isPending: false,

    user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: '',
    },
}



export const mainAppRED = (state = initialMainState, action = {}) => {
    switch (action.type) {

        case CHANGE_ROUTE:
            if (action.payload === 'signin') {
                //clear out states when signing out
                storage.removeItem('persist:root')
                return Object.assign({}, state, initialMainState)
            }
            if (action.payload === 'home') {
                return Object.assign({}, state, { route: action.payload, isSignedIn: true })
            }
            else {
                return Object.assign({}, state, { route: action.payload })
            }

        case CHANGE_URL_INPUT:
            return Object.assign({}, state, { imageUrl: action.payload })

        case SIGNIN_SUCCESS_LOAD_USER:
            return Object.assign({}, state, {
                isSignedIn: true,
                user: Object.assign({}, state.user, {
                    id: action.payload.id,
                    name: action.payload.name,
                    email: action.payload.email,
                    entries: action.payload.entries,
                    joined: action.payload.joined
                })
            })

        case PREDICT_FACE_PENDING:
            return Object.assign({}, state, { predictionStatus: 'Loading...', imageUrl: action.payload, isPending: true })
        case PREDICT_FACE_FAILED:
            return Object.assign({}, state, { predictionStatus: action.payload, isPending: false })

        case FACE_MARKINGS:
            return Object.assign({}, state, { box: action.payload, predictionStatus: action.predictionStatus, isPending: false })
        case NO_FACE_MARKINGS:
            return Object.assign({}, state, { predictionStatus: action.predictionStatus, isPending: false })
        case CLEAR_MARKINGS:
            return Object.assign({}, state, { box: [] })

        case UPDATE_SUBMISSION_PENDING:
            return Object.assign({}, state, { isPending: true })
        case UPDATE_SUBMISSION_SUCCESS:
            return Object.assign({}, state, {
                user: Object.assign({}, state.user, { entries: action.payload }),
                isPending: false
            })
        case UPDATE_SUBMISSION_FAILED:
            return Object.assign({}, state, { predictionStatus: action.predictionStatus, isPending: false })

        default:
            return state;
    }
}