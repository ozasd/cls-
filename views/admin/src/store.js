import { configureStore} from '@reduxjs/toolkit'
import DataSliceReducer from './views/DataSlice'
import BuilderSliceReducer from './views/BuilderSlice'


export default configureStore({
    reducer:{
        Data:DataSliceReducer,
        Builder:BuilderSliceReducer

    }
})