import "./styles.css";
import { ReactDOM, useEffect } from "react";
import React, { useState } from "react";

const useTitle = (initalTitle) => {
    const [title, setTitle] = useState(initalTitle);
    const updateTitle = () => {
        const htmlTitle = document.querySelector("title");
        htmlTitle.innerText = title;
    };
    useEffect(updateTitle, [title]);
    return setTitle;
};
export default function App() {
    const titleUpdater = useTitle("Loading..");
    // titleUpdater = setTitle
    // but 기본 값에 의해 useTitle = Loading..이 됨
    setTimeout(() => titleUpdater("Home"), 2000);
    return <div className="App"></div>;
}
