import React from "react";

import "./word.styles.css";
import {useDispatch} from "react-redux";
import {selectValue, showSelectItem} from "../../redux/words/words.actions";
import {v4} from "uuid";

const Word = (props) => {

    const {id, lettersArray} = props;
    const dispatch = useDispatch();

    const selectStroke = (event) => {
        event.stopPropagation();

        dispatch(showSelectItem(id))

        dispatch(selectValue())

    }

    return (
        <div className={"word-div"} onClick={selectStroke} key={id}>
            {
                lettersArray.map(({letter, color, backgroundColor, fontSize}, uniqueId) => <span style={{
                    color,
                    backgroundColor,
                    fontSize
                }} key={uniqueId}>{letter}</span>)
            }
            {" "}
        </div>
    )
}

export default Word;
