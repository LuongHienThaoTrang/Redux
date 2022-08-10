// import { createStore, applyMiddleware } from 'redux';
// import rootReducer from './reducer';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import logger from 'redux-logger'
// import thunk from 'redux-thunk'


// const store = createStore(
//     rootReducer,
//     composeWithDevTools(applyMiddleware(logger, thunk))
// );

// export default store;

// Cách 2: Viết Redux Toolkit
import { configureStore } from '@reduxjs/toolkit'
import filtersSlice from '../components/Filters/FiltersSlice'
import todoListSlice from '../components/TodoList/TodosSlice'

const store = configureStore({
    reducer: {
        filters: filtersSlice.reducer,
        todoList: todoListSlice.reducer,
    }
})

export default store