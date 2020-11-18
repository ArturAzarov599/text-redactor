import WordsActionTypes from "./words.types";

export const addWordToList = data => ({
    type: WordsActionTypes.ADD_WORD,
    payload: data
})

export const selectValue = () => ({
    type: WordsActionTypes.SELECT_VALUE
})

export const reselectValue = () => ({
    type: WordsActionTypes.RESELECT_VALUE
})

export const showSelectItem = id => ({
    type: WordsActionTypes.SELECT_VALUE_ITEM,
    payload: id
})

export const editNewChanges = data => ({
    type: WordsActionTypes.EDIT_NEW_CHANGES,
    payload: data
})

// sagas actions
export const checkValueInArray = data => ({
    type: WordsActionTypes.CHECK_ELEMENT_PARAMETERS,
    payload: data
})

export const checkLettersArray = data => ({
    type:WordsActionTypes.CHECK_LETTERS_ARRAY,
    payload: data
})
