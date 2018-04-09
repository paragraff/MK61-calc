import {createStore} from 'redux'
import reducer from './reducer'
import powerReducer from './Reducers/powerReducer'
import screenReducer from './Reducers/screenReducer'
import angleUnitsReducer from './Reducers/angleUnitsReducer'
import pressButtonReducer from './Reducers/pressButtonReducer'

reducer.register(powerReducer)
reducer.register(screenReducer)
reducer.register(angleUnitsReducer)
reducer.register(pressButtonReducer)

const store = createStore(reducer);

export default store;
