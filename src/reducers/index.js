import { combineReducers } from "redux"
import loginReducer from "./loginReducer"
import blogReducer from "./blogReducer";

const blog_reducer = combineReducers({
    loginReducer: loginReducer,
    blogReducer: blogReducer
})

export default blog_reducer;