import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
import { userReducer } from './reducers/userReducer'
import { cartReducer } from './reducers/cartReducer'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['userReducer', 'cartReducer'],
}

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const rootReducer = combineReducers({
  userReducer,
  cartReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk))
)
export const persistor = persistStore(store)
