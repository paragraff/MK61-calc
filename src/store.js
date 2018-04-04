import {createStore} from 'redux'
import reducer from './reducer'
import powerReducer from './Reducers/powerReducer'
import screenReducer from './Reducers/screenReducer'

reducer.register(powerReducer)
reducer.register(screenReducer)

const store = createStore(reducer);

export default store;
