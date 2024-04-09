import { configureStore } from '@reduxjs/toolkit'

import counterReducer from './counterSlice'
import filmsReducer from './filmsSlice'

export default configureStore({
    reducer: {
        counter: counterReducer,
        films: filmsReducer
    }
})
