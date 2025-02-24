 React의 useTabs 훅과 탭 전환 원리 완벽 이해하기
===

이 코드는 **탭을 클릭하면 해당 탭의 내용이 화면에 표시되는 기능**을 구현한 것이다.

즉, "현재 선택된 탭의 내용을 어떻게 가져오고, 어떻게 바꾸는지"를 이해하면 코드의 원리를 완전히 알 수 있음

---

## **1️⃣ 현재 선택한 `content`를 얻는다는 것은?**

> 💬 **“우리는 화면에 현재 선택한 탭의 내용을 보여주고 싶어요.”**
> 

이 말은 **현재 선택된 탭이 `content` 배열에서 몇 번째인지(index)** 를 알아야 한다는 뜻이다.

예를 들어 `useTabs(0, content)`라고 했을 때:

✅ `0`번 인덱스를 의미하므로 **`content[0]`의 데이터를 가져오겠다!** 는 의미가 된다.

> 즉, 우리가 원하는 것은 "현재 선택된 탭의 내용(content)을 가져오는 것"이고, 그 내용을 얻기 위해서는 content 배열의 특정 인덱스를 알아야 한다는 거다.!
> 

---

## **2️⃣ `useTabs` 훅이 하는 일**

```jsx

const useTabs = (initialTabs, allTabs) => {
  if (!allTabs || !Array.isArray(allTabs)) {
    return;
  }

  const [currentIndex, setCurrentIndex] = useState(initialTabs);
  return {
    currentItem: allTabs[currentIndex], // 현재 선택된 content
    changeItem: setCurrentIndex, // index를 변경하는 함수
  };
};

```

### 🔹 **`useTabs`의 역할**

1. 현재 선택된 **탭의 인덱스(`currentIndex`)** 를 저장하고 관리한다.
2. 현재 선택된 탭의 **내용(`currentItem`)** 을 `content` 배열에서 가져온다.
3. 탭을 변경할 수 있는 **함수(`changeItem`)** 를 제공한다.

✅ `useTabs(0, content)`을 호출하면:

- `currentIndex`가 **0**으로 설정됨 → 즉, `currentItem = content[0]`
- `changeItem`은 `setCurrentIndex`를 가리키므로, 이를 실행하면 `currentIndex`를 바꿀 수 있음

### **🚀 실행 흐름 예시**

```jsx

const { currentItem, changeItem } = useTabs(0, content);

```

📌 `useTabs(0, content)`을 실행하면:

1. `currentIndex = 0`이므로, `currentItem = content[0]`
2. 즉, `currentItem = { tab: "Section 1", content: "I'm the content of the Section 1" }`
3. 현재 `currentItem.content`는 `"I'm the content of the Section 1"`이 됨

---

## **3️⃣ `changeItem`이 하는 일**

처음에는 `currentIndex = 0`이지만, 사용자가 다른 탭을 클릭하면 바꿔줘야 한다.

이때 `changeItem`이 실행되면서 `currentIndex` 값이 업데이트된다.

```jsx

<button onClick={() => changeItem(index)}>{section.tab}</button>

```

- 사용자가 버튼을 클릭하면 `onClick={() => changeItem(index)}`가 실행된다.
- `changeItem(index)`는 결국 `setCurrentIndex(index)`와 같음!
- `setCurrentIndex`가 실행되면 `currentIndex`가 **변경**되고, 변경된 값에 따라 `currentItem`도 업데이트된다.

✅ 즉, 버튼을 클릭하면:

1. `changeItem(index)` 실행 → `currentIndex` 변경됨
2. `currentItem = content[currentIndex]`로 자동 업데이트됨
3. React가 상태 변화를 감지하고 화면을 **다시 렌더링(render)** 함
4. 새로운 `content`가 화면에 표시됨 🎉

---

## **4️⃣ 전체 실행 흐름 정리**

### 🔹 **초기 상태**

✅ `useTabs(0, content)`을 실행하면:

- `currentIndex = 0`
- `currentItem = content[0]`
- 따라서 **처음에는 `Section 1`의 내용이 보임**

### 🔹 **버튼 클릭 시**

✅ 사용자가 **"Section 2"** 버튼을 클릭하면:

1. `onClick={() => changeItem(1)}` 실행됨
2. `changeItem(1)`은 결국 `setCurrentIndex(1)` 실행
3. 그러면 `currentIndex`가 **1로 변경**
4. React가 자동으로 다시 렌더링하면서 **`currentItem = content[1]`** 으로 바뀜
5. 따라서 `"I'm the content of the Section 2"`가 화면에 나타남! 🎉

---

## **5️⃣ 최종 결론**

➡️ `changeItem(index)`가 실행되면 `currentIndex`가 바뀜

➡️ `currentIndex`가 바뀌면 `currentItem`이 변경됨

➡️ `currentItem`이 변경되면 React가 화면을 다시 렌더링하여 새로운 내용이 표시됨

---

## **6️⃣ 최종 요약**

📌 **"현재 선택한 탭의 content를 얻고 싶다"**

➡️ `currentIndex`를 사용해 `content[currentIndex]`를 가져온다.

📌 **"탭을 클릭하면 내용이 바뀌게 하고 싶다"**

➡️ `changeItem(index)`를 사용해 `currentIndex`를 변경하면 자동으로 React가 업데이트해준다.

📌 **"어떤 원리로 동작하는가?"**

1. `useTabs(0, content)` → **처음에는 첫 번째 탭의 내용이 표시됨**
2. 버튼 클릭하면 `changeItem(index)` 실행 → `currentIndex` 변경됨
3. `currentIndex`가 바뀌면서 `currentItem`도 변경됨
4. React가 변경된 `currentItem`을 화면에 다시 그림(렌더링)
5. 새로운 탭 내용이 나타남 🎉