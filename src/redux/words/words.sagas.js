import {all, put, takeLatest, call} from "redux-saga/effects";

import WordsActionTypes from "./words.types";
import {checkLettersArray, checkValueInArray} from "./words.actions";

//Check parameters
function* checkParameters(props) {
    const {payload} = props
    const {id, color, backgroundColor, fontSize, lettersArray, text} = payload;
    yield put(checkValueInArray({id, color, backgroundColor, fontSize, lettersArray, text}))

}

function* addWordInListSaga() {
    yield takeLatest(WordsActionTypes.ADD_WORD, checkParameters)
}

//Check lettersArray
function* checkLettersArrayParameters(props) {
    console.log(props);
    const {payload} = props
    yield put(checkLettersArray(payload))
    yield put(checkValueInArray(payload))
}

function* editChangesIntoLettersArray() {
    yield takeLatest(WordsActionTypes.EDIT_NEW_CHANGES, checkLettersArrayParameters)
}


export default function* WordsSagas() {
    yield all([
        call(addWordInListSaga),
        call(editChangesIntoLettersArray),
    ])
}


