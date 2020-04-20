import { updateObject } from '../../shared/utility';
import * as actionTypes from '../../actions/actionType';

const initialState = {
   
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.USER_PROFILE:
            return updateObject(state, { datalist: action.data })
        default:
            return state
    }
}

export default reducer
