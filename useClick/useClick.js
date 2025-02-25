import "./styles.css";
import { ReactDOM, useEffect } from "react";
import React, { useRef } from "react";

const useClick = (onClick) => {
    if (typeof onClick != "function") {
        return;
    }
    const element = useRef();
    useEffect(() => {
        if (element.current) {
            element.current.addEventListener("click", onClick);
        }
        return () => {
            if (element.current) {
                element.current.removeEventListener("click", onClick);
            }
        };
    }, []);
    return element;
};
export default function App() {
    const sayHello = () => console.log("say Hello");
    const title = useClick(sayHello);
    return (
        <div className="App">
            <h1 ref={title}>Hi</h1>
        </div>
    );
}
