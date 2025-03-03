### 1. 기능

- `useTitle` 커스텀 훅을 사용하여 `document.title`을 동적으로 변경함.
- `setTitle`을 반환하여 외부에서 제목을 변경할 수 있도록 함.

### 2. 코드 구조

```jsx
const useTitle = (initialTitle) => {
  const [title, setTitle] = useState(initialTitle);
  useEffect(() => {
    document.title = title;
  }, [title]);
  return setTitle; // ✅ 반드시 반환해야 함
};

```

### 3. 사용 예시

```jsx
export default function App() {
  const titleUpdater = useTitle("Loading..");

  setTimeout(() => titleUpdater("Home"), 2000);

  return <div className="App"></div>;
}

```

- `useTitle("Loading..")` 실행 후 `document.title`을 `"Loading.."`으로 설정
- `setTimeout`을 사용해 2초 후 `titleUpdater("Home")` 실행 → `document.title`이 `"Home"`으로 변경됨.

### 4. 주의할 점

- `useTitle`에서 `setTitle`을 반환하지 않으면 `titleUpdater`가 `undefined`가 되어 **TypeError: titleUpdater is not a function** 발생한다.
- 반드시 `return setTitle;`을 추가해야 정상 동작한다.