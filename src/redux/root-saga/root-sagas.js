import {all, call} from "redux-saga/effects"
import WordsSagas from "../words/words.sagas";

function* rootSaga() {
    yield all([
        call(WordsSagas)
    ])
}

export default rootSaga;
