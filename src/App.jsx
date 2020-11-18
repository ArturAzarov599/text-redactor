import React from "react";

import './App.css';
import Header from "./components/header/header.component";
import Content from "./components/content/content.component";
import {useDispatch} from "react-redux";
import {reselectValue} from "./redux/words/words.actions";
import WordsChanges from "./components/word-changes/words-changes.component";

const App = () => {

    const dispatch = useDispatch();

    return (
        <div className="App">
            <Header/>
            <WordsChanges/>
            <div onClick={() => dispatch(reselectValue())}>
                <Content/>
            </div>
        </div>
    )
}

export default App;
