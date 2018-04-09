import {createStore} from 'redux'
import reducer from './reducer'
import powerReducer from './Reducers/powerReducer'
import screenReducer from './Reducers/screenReducer'
import angleUnitsReducer from './Reducers/angleUnitsReducer'
import pressButtonReducer from './Reducers/pressButtonReducer'
import memoryReducer from './Reducers/memoryReducer'

reducer.register(powerReducer)
reducer.register(screenReducer)
reducer.register(angleUnitsReducer)
reducer.register(pressButtonReducer)
reducer.register(memoryReducer)

const store = createStore(reducer);

export default store;
