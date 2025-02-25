import { useRef, useState, useEffect } from "react";

function App() {
    const [count, setCount] = useState(0);
    const prevCountRef = useRef(0);

    useEffect(() => {
        prevCountRef.current = count; // 현재 count 값을 prevCountRef에 저장
    }, [count]); // count가 바뀔 때마다 실행

    return (
        <div>
            <p>현재 값: {count}</p>
            <p>이전 값: {prevCountRef.current}</p>
            <button onClick={() => setCount(count + 1)}>증가</button>
        </div>
    );
}

export default App;
