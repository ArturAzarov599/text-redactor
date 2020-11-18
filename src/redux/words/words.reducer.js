import WordsActionTypes from "./words.types";
import {v4} from "uuid";

const INITIAL_STATE = {
    wordsArray: [],
    selectValue: "",
    showSelectedItem: null,
}

const wordsReducer = (state = INITIAL_STATE, action) => {

        const newArray = [...state.wordsArray];

        switch (action.type) {
            case WordsActionTypes.ADD_WORD:
                return {
                    ...state, wordsArray: [...state.wordsArray, action.payload]
                }

            case WordsActionTypes.RESELECT_VALUE:
                return {
                    ...state, selectValue: ""
                }

            case WordsActionTypes.SELECT_VALUE:
                return {
                    ...state, selectValue: window.getSelection().toString() || " "
                }

            case WordsActionTypes.SELECT_VALUE_ITEM:
                return {
                    ...state, showSelectedItem: state.wordsArray.filter(word => word.id === action.payload)
                }

            case WordsActionTypes.EDIT_NEW_CHANGES:

                const {backgroundColor, color, fontSize, text} = action.payload;

                const index = state.showSelectedItem[0].id;
                const arrayShowSelectionText = state.showSelectedItem[0].lettersArray
                const getFirstIndexOfMatch = state.showSelectedItem[0].text.match(state.selectValue).index

                arrayShowSelectionText.splice(getFirstIndexOfMatch, state.selectValue.length);

                const arrayOfChangesSelectedValue = text.split("").map(letter => ({
                    letter,
                    color,
                    backgroundColor,
                    fontSize: +fontSize
                }));

                arrayOfChangesSelectedValue.map(lettersData => lettersData.letter)
                    .reverse().map(letterObject => arrayShowSelectionText
                    .splice(getFirstIndexOfMatch, 0, {
                        letter: letterObject,
                        backgroundColor,
                        color,
                        fontSize: +fontSize
                    }))

                newArray.map(object => {
                    if (object.id === index) {
                        return object.lettersArray = arrayShowSelectionText
                    }
                    return object
                })

                return {
                    ...state, wordsArray: newArray
                }

            case WordsActionTypes.CHECK_ELEMENT_PARAMETERS:

                const findIndex = state.wordsArray.length - 2;
                if (action.payload.lettersArray)
                    if (findIndex > -1)
                        if (newArray[findIndex].color === action.payload.color &&
                            newArray[findIndex].backgroundColor === action.payload.backgroundColor &&
                            newArray[findIndex].fontSize === action.payload.fontSize) {

                            const spaceArray = [{
                                letter: " ",
                                color: action.payload.color,
                                backgroundColor: action.payload.backgroundColor,
                                fontSize: +action.payload.fontSize
                            }]

                            newArray[findIndex] = {
                                id: newArray[findIndex].id,
                                color: action.payload.color,
                                backgroundColor: action.payload.backgroundColor,
                                fontSize: action.payload.fontSize,
                                text: newArray[findIndex].text + " " + action.payload.text,
                                lettersArray: newArray[findIndex].lettersArray.concat(spaceArray, action.payload.lettersArray)
                            }

                            newArray.pop();

                            return {
                                ...state, wordsArray: newArray
                            }
                        }

                return {
                    ...state, wordsArray: newArray
                }

            case WordsActionTypes.CHECK_LETTERS_ARRAY:

                const findElementIndex = state.showSelectedItem[0].id;

                const originalString = state.showSelectedItem[0].text;

                const prevFontSize = state.showSelectedItem[0].fontSize;
                const prevColor = state.showSelectedItem[0].color;
                const prevBackgroundColor = state.showSelectedItem[0].backgroundColor;

                const changedColor = action.payload.color;
                const changedBackgroundColor = action.payload.backgroundColor;
                const changedFontSize = action.payload.fontSize;

                const selectedString = state.selectValue;
                const indexOfMatch = originalString.match(selectedString).index;
                const lettersArray = state.showSelectedItem[0].lettersArray;


                const letterArrayWithChangesParameters = lettersArray
                    .filter(object => object.backgroundColor === changedBackgroundColor && object.color === changedColor && object.fontSize === +changedFontSize);

                const leftArrayBeforeSelect = lettersArray.slice().splice(0, indexOfMatch);
                const leftArrayAfterSelect =
                    lettersArray.slice().splice(selectedString.length + indexOfMatch, originalString.length - selectedString.length - indexOfMatch);

                const createTextFromLettersArray = array => {
                    let text = ""
                    array.forEach(object => text += object.letter)
                    return text;
                }

                const prevArray = {
                    id: v4(),
                    color: prevColor,
                    backgroundColor: prevBackgroundColor,
                    fontSize: prevFontSize,
                    lettersArray: leftArrayBeforeSelect,
                    text: createTextFromLettersArray(leftArrayBeforeSelect)
                }

                const nextArray = {
                    id: v4(),
                    color: prevColor,
                    backgroundColor: prevBackgroundColor,
                    fontSize: +prevFontSize,
                    lettersArray: leftArrayAfterSelect,
                    text: createTextFromLettersArray(leftArrayAfterSelect)

                }

                const arrayWithChanges = {
                    id: v4(),
                    color: changedColor,
                    backgroundColor: changedBackgroundColor,
                    fontSize: +changedFontSize,
                    lettersArray: letterArrayWithChangesParameters,
                    text: createTextFromLettersArray(letterArrayWithChangesParameters)
                }


                newArray.map(object => {
                    if (object.id === findElementIndex) {
                        const indexArrayElement = newArray.indexOf(object)
                        return newArray.splice(indexArrayElement, 1, prevArray, arrayWithChanges, nextArray)
                    }
                    return object
                })

                const clearedArray = newArray.filter(obj => obj.lettersArray.length > 0)

                return {
                    ...state, wordsArray: clearedArray
                }

            default:
                return state
        }
    }
;

export default wordsReducer;
