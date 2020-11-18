import {combineReducers} from "redux";
import wordsReducer from "./words/words.reducer";

const rootReducer = combineReducers({
    words: wordsReducer
})

export default rootReducer;
