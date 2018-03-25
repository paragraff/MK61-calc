import {createStore} from 'redux'
import reducer from './reducer'
import powerReducer from './Reducers/powerReducer'

reducer.register(powerReducer);

const store = createStore(reducer);

export default store;
