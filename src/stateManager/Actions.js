import {
    CHANGE_URL_INPUT,

    CHANGE_ROUTE,

    SIGNIN_SUCCESS_LOAD_USER,

    PREDICT_FACE_PENDING,
    PREDICT_FACE_FAILED,

    UPDATE_SUBMISSION_PENDING,
    UPDATE_SUBMISSION_SUCCESS,
    UPDATE_SUBMISSION_FAILED,

    FACE_MARKINGS,
    NO_FACE_MARKINGS,
    CLEAR_MARKINGS
} from './Constants'

import { stateStore } from '../index';



export const writeImageUrlACT = (text) => ({
    type: CHANGE_URL_INPUT,
    payload: text
})

export const changeRouteACT = (theRoute) => ({
    type: CHANGE_ROUTE,
    payload: theRoute
})

export const signInLoadUserACT = (data) => ({
    type: SIGNIN_SUCCESS_LOAD_USER,
    payload: data
})


export const predictFaceACT = (theUrl) => (dispatch) => {
    dispatch({
        type: PREDICT_FACE_PENDING,
        payload: theUrl
    })
    fetch('https://fathomless-oasis-93003.herokuapp.com/imageurl', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            input: theUrl,
        })
    })
        .then(response => response.json())
        .then(reply => {
            let detected = false
            if (reply) {
                detected = dispatch(faceMarkingACT(reply))
            }

            if (detected) {
                dispatch(updateSubmissionACT(stateStore.getState().mainAppRED.user.id))
                //dispatch(getSubmissionACT(stateStore.getState().mainAppRED.user.id))
            }
        })
        .catch(err => {
            dispatch({
                type: PREDICT_FACE_FAILED,
                payload: 'Unable to contact API'
            })
        })
}

export const faceMarkingACT = (responseFromAPI) => (dispatch) => {
    dispatch({ type: CLEAR_MARKINGS })
    const image = document.getElementById('inputImage')
    const regions = responseFromAPI.outputs[0].data.regions

    if (regions) {
        let boxCoordinates = []
        regions.map((region) => {
            boxCoordinates = [...boxCoordinates, {
                leftCol: region.region_info.bounding_box.left_col * Number(image.width),
                topRow: region.region_info.bounding_box.top_row * Number(image.height),
                rightCol: Number(image.width) * (1 - region.region_info.bounding_box.right_col),
                bottomRow: Number(image.height) * (1 - region.region_info.bounding_box.bottom_row),
            }]
            return boxCoordinates
        })
        dispatch({
            type: FACE_MARKINGS,
            payload: boxCoordinates,
            predictionStatus: 'Detected'
        })
        return true
    }
    else {
        dispatch({
            type: NO_FACE_MARKINGS,
            predictionStatus: 'No faces detected on image'
        })
        return false
    }
}

export const updateSubmissionACT = (id) => (dispatch) => {
    dispatch({ type: UPDATE_SUBMISSION_PENDING })
    fetch('https://fathomless-oasis-93003.herokuapp.com/image', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id,
        })
    })
        .then(response => response.json())
        .then(reply => {
            if (reply === 'Unable to update entries') {
                dispatch({
                    type: UPDATE_SUBMISSION_FAILED,
                    payload: reply
                })
            }
            else {
                dispatch({
                    type: UPDATE_SUBMISSION_SUCCESS,
                    payload: reply
                })
            }
        })
        .catch(err => {
            dispatch({
                type: UPDATE_SUBMISSION_FAILED,
                payload: 'Unable to update image submission count'
            })
        })
}

/*
export const getSubmissionACT = (id) => (dispatch) => {
    dispatch({ type: GET_SUBMISSION_PENDING })

    const fetchEntriesUrl = 'https://fathomless-oasis-93003.herokuapp.com/getentries/' + id
    const promise = new Promise((resolve, reject) => {
        setTimeout(resolve, 1000, fetchEntriesUrl)
    })
    promise.then( () => {
        fetch(fetchEntriesUrl, { method: 'get' })
            .then(response => response.json())
            .then(reply => {
                if (reply) {
                    dispatch({
                        type: GET_SUBMISSION_SUCCESS,
                        payload: reply
                    })
                }
            })
            .catch(err => {
                dispatch({
                    type: GET_SUBMISSION_FAILED,
                    payload: 'Unable to retrieve image submission count'
                })
            })
    })
}
*/