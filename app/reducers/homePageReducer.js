/**
 * Created by ChenMmao on 2017/7/7.
 */
import * as types from '../actions/actionTypes';
import {Map} from 'immutable';

const initialState =Map({
    isShowLoading:true,
    text:'Hello React'
});
let MainReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_HOME_LIST:{
            return state.merge({
                isShowLoading:action.isShowLoading
            })
        }
        default:
            return state;
    }
};

export default MainReducer;