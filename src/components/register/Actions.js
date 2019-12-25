import {
    CHANGE_NAME_REG,
    CHANGE_EMAIL_REG,
    CHANGE_PASSWORD_REG,
    
    REGISTER_PENDING,
    REGISTER_FAILED,
} from './Constants'

import { REGISTER_SUCCESS } from '../signIn/Constants'

import { changeRouteACT } from '../../stateManager/Actions'

export const writeNameACT = (text) => ({
    type: CHANGE_NAME_REG,
    payload: text
})

export const writeEmailACT = (text) => ({
    type: CHANGE_EMAIL_REG,
    payload: text
})

export const writePasswordACT = (text) => ({
    type: CHANGE_PASSWORD_REG,
    payload: text
})

export const submitRegisterACT = (name, email, password) => (dispatch) => {
    dispatch({ type: REGISTER_PENDING })
    fetch('https://fathomless-oasis-93003.herokuapp.com/register', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name,
            email,
            password
        })
    })
        .then(response => response.json())
        .then(reply => {
            if (reply === 'Fail registering') {
                dispatch({
                    type: REGISTER_FAILED,
                    payload: reply
                })
            }
            else if (reply === 'Incorrect form submission') {
                dispatch({
                    type: REGISTER_FAILED,
                    payload: reply
                })
            }
            else {
                dispatch({
                    type: REGISTER_SUCCESS,
                    payload: 'Registration successful. Please login'
                })
                dispatch( changeRouteACT('signin') )
            }
        })
        .catch(err => {
            dispatch({
                type: REGISTER_FAILED,
                payload: 'Unable to register'
            })
        })
}