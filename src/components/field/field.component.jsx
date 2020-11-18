import React, {useState} from "react";

import "./field.styles.css";
import {v4} from "uuid";
import {useDispatch, useSelector} from "react-redux";
import {addWordToList} from "../../redux/words/words.actions";
import WordList from "../words-list/words-list.component";
import colorArray from "../../colors.array";
import fontSizesArray from "../../fontSizes.array";

const Field = () => {

    const wordsArray = useSelector(state => state.words.wordsArray)
    const dispatch = useDispatch();
    const [textObject, setTextObject] = useState({
        text: "",
        color: "",
        backgroundColor: "",
        fontSize: 14
    });

    const {text, color, backgroundColor, fontSize} = textObject

    const onChangeHandler = event => {
        const {name, value} = event.target

        setTextObject({...textObject, [name]: value})
    }

    const addWord = () => {
        const letters = text.split("")

        const lettersArray = letters.map(letter => ({
            letter,
            color: color || " ",
            backgroundColor: backgroundColor || "",
            fontSize: +fontSize || 14
        }))

        dispatch(addWordToList({
            id: v4(),
            color,
            backgroundColor,
            fontSize,
            text,
            lettersArray
        }))

        setTextObject({
            text: "",
            fontSize,
            backgroundColor,
            color
        })
    }

    const onAddWord = () => addWord();


    const onKeyPressHandler = event => {
        if (event.key === 'Enter' || event.key === " ") {
            event.preventDefault();
            return addWord();
        }
    }

    const convertToJSON = () => {
        return wordsArray.map(({text, color, fontSize, backgroundColor}) => console.log(JSON.stringify({
            text,
            color,
            backgroundColor,
            fontSize: fontSize + "px"
        })));
    }

    return (
        <div className="field-component">
            <div title="To add word click Enter, Space or Add word!" className="field__container __container">
                <input name="text" value={textObject.text} onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}/>
                <select value={textObject.color} name="color" onChange={onChangeHandler}>
                    {
                        colorArray.map(color => <option key={color} style={{
                            color: "white",
                            backgroundColor: color
                        }}
                                                        value={color}>{color}</option>)
                    }
                </select>

                <select value={textObject.backgroundColor} name="backgroundColor" onChange={onChangeHandler}>
                    {
                        colorArray.map(colorElement => <option key={colorElement}
                                                               style={{
                                                                   color: "white",
                                                                   backgroundColor: colorElement
                                                               }}
                                                               value={colorElement}>{colorElement}</option>)
                    }
                </select>

                <select value={textObject.fontSize} name="fontSize" onChange={onChangeHandler}>
                    {
                        fontSizesArray.map(size => <option key={size} value={size}>{size}</option>)
                    }
                </select>
                <button onClick={onAddWord}>Add word</button>
                <button onClick={convertToJSON}>Convert to JSON</button>
            </div>
            <WordList wordsArray={wordsArray}/>
        </div>
    )
}

export default Field;
