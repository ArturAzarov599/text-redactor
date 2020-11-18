import React from "react";

import "./word-list.styles.css";
import Word from "../word/word.component";

const WordList = ({wordsArray}) => {
    return (
        <div className="words-list">
            {
                wordsArray.map((word, uniqueKey) => <Word key={uniqueKey}  {...word}/>)
            }
        </div>
    )
}

export default WordList;
