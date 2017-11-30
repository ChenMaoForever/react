/**
 * Created by ChenMao on 2016/11/29.
 *
 * 合并reducer
 */
//import { combineReducers } from 'redux';不使用immutable
import {combineReducers} from 'redux-immutable';//使用immutable
import HomePage  from "./homePageReducer.js";//首页

let rootReducer = combineReducers({
   HomePage
})

export default rootReducer;




