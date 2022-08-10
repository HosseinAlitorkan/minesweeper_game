import {configureStore} from '@reduxjs/toolkit';   
import reducer from '../Features/Data';
export default configureStore({
    reducer: {data:reducer}});