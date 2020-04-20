import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import profile from "./reducers/profile/profile";

const composeEnhancers = null || compose;
const rootReducer = combineReducers({
  userProfile: profile,
})

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk))
);

export default store
