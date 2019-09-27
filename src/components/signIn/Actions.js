import {
    CHANGE_EMAIL_SIGNIN,
    CHANGE_PASSWORD_SIGNIN,

    SIGNIN_PENDING,
    SIGNIN_FAILED
} from './Constants'

import {
    signInLoadUserACT,
    changeRouteACT,
} from '../../stateManager/Actions'


export const writeEmailACT = (text) => ({
    type: CHANGE_EMAIL_SIGNIN,
    payload: text
})

export const writePasswordACT = (text) => ({
    type: CHANGE_PASSWORD_SIGNIN,
    payload: text
})

export const submitSignInACT = (email, password) => (dispatch) => {
    dispatch({ type: SIGNIN_PENDING })
    fetch('https://fathomless-oasis-93003.herokuapp.com/signin', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email,
            password
        })
    })
        .then(response => response.json())
        .then(reply => {
            if (reply === 'Username or password incorrect') {
                dispatch({
                    type: SIGNIN_FAILED,
                    payload: reply
                })
            }
            else if (reply.id) { //using reply.id just for checking that the signing in user is valid and has ID
                dispatch( signInLoadUserACT(reply) )
                dispatch( changeRouteACT('home') )
            }
        })
        .catch(err => {
            dispatch({
                type: SIGNIN_FAILED,
                payload: 'Unable to log in'
            })
        })
}