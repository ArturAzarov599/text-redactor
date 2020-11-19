import React, {useEffect, useState} from "react";

import "./words-changes.styles.css";
import {useDispatch, useSelector} from "react-redux";
import {editNewChanges} from "../../redux/words/words.actions";
import colorArray from "../../colors.array";
import fontSizesArray from "../../fontSizes.array";

const WordsChanges = () => {

    const selectedValue = useSelector(state => state.words.selectValue);
    const dispatch = useDispatch();
    const [newValue, setNewValue] = useState({
        text: "",
        color: "",
        fontSize: 14,
        backgroundColor: ""
    });

    useEffect(() => {
        setNewValue({
            text: selectedValue,
            fontSize: 14,
            backgroundColor: "",
            color: ""
        })
    }, [selectedValue])

    const onChangeHandler = event => {

        event.stopPropagation();
        const {name, value} = event.target;

        setNewValue({...newValue, [name]: value})
    }

    const editChanges = () => {
        dispatch(editNewChanges(newValue))

        setNewValue({
            text: "",
            fontSize: 14,
            color: "",
            backgroundColor: ""
        })
    }

    return (
        <div className={"words-changes"}>

            <textarea name="text" value={newValue.text} onChange={onChangeHandler}/>

            <select value={newValue.color} name="color" onChange={onChangeHandler}>
                {
                    colorArray.map(color => <option key={color} style={{
                        color: "white",
                        backgroundColor: color
                    }}
                                                    value={color}>{color}</option>)
                }
            </select>

            <select value={newValue.backgroundColor} name="backgroundColor" onChange={onChangeHandler}>
                {
                    colorArray.map(colorElement => <option key={colorElement}
                                                           style={{
                                                               color: "white",
                                                               backgroundColor: colorElement
                                                           }}
                                                           value={colorElement}>{colorElement}</option>)
                }
            </select>

            <select defaultValue="14" name="fontSize" onChange={onChangeHandler}>
                {
                    fontSizesArray.map(size => <option key={size} value={size}>{size}</option>)
                }
            </select>

            <button onClick={editChanges}>Edit changes</button>
        </div>
    )
}

export default WordsChanges;
