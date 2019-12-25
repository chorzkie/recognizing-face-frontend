import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import 'tachyons'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react';

import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { mainAppRED } from './stateManager/Reducers'
import { registerRED } from './components/register/Reducers'
import { signInRED } from './components/signIn/Reducers'



const logger = createLogger()

const persistConfig = { key: 'root', storage: storage, whitelist: ['mainAppRED', 'registerRED', 'signInRED'] }

const totalReducer = combineReducers({ mainAppRED, registerRED, signInRED })

const rootReducer = (state, action) => {
 return totalReducer(state, action)
}

const pReducer = persistReducer(persistConfig, rootReducer);
export const stateStore = createStore(pReducer, applyMiddleware(thunkMiddleware, logger))

const persistor = persistStore(stateStore);




ReactDOM.render( 
    <Provider store={stateStore}>
		<PersistGate persistor={persistor} >
			<App /> 
		</PersistGate>
    </Provider>, 
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

serviceWorker.unregister()
