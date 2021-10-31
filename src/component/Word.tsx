import { useState } from "react";

interface IProps {
  word: IWord;
}

export interface IWord {
  day: string;
  eng: string;
  kor: string;
  isDone: boolean;
  id: number;
}

export default function Word({ word: w }: IProps) {
  // props로 넘어온 변수 word를 w라는 변수명으로 사용 하겠다.
  const [word, setWord] = useState(w);
  const [isShow, setIsShow] = useState(false);
  const [isDone, setIsDone] = useState(word.isDone);

  function toggleShow() {
    setIsShow(!isShow);
  }

  function toggleDone() {
    // setIsDone(!isDone);
    // fetch의 두번째 인자로 객체를 넣고 그 객체에는 요청의 옵션들을 입력
    fetch(`http://localhost:3001/words/${word.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        // 보내는 리소스의 타입을 입력. 문자열부터 html, 이미지등 여러가지 가능 우리는 json형태로 받음
      },
      // body에는 수정을 위한 정보들을 실어서 보내줌
      body: JSON.stringify({
        // 기존데이터에 isDone을 바꿔서 입력
        ...word,
        isDone: !isDone,
      }),
    }).then((res) => {
      // 상기와 같이 요청해서 응답이 ok면 상태를 그대로 변경
      if (res.ok) {
        setIsDone(!isDone);
      }
    });
  }

  function del() {
    if (window.confirm("삭제 하시겠습니까?")) {
      fetch(`http://localhost:3001/words/${word.id}`, {
        method: "DELETE",
      }).then((res) => {
        if (res.ok) {
          setWord({ ...word, id: 0 });
        }
      });
    }
    if (word.id === 0) {
      return null;
    }
  }

  return (
    <tr className={isDone ? "off" : ""}>
      <td>
        <input type="checkbox" checked={isDone} onChange={toggleDone} />
      </td>
      <td>{word.eng}</td>
      <td>{isShow && word.kor}</td>
      <td>
        <button onClick={toggleShow}>뜻 {isShow ? "숨기기" : "보기"}</button>
        <button className="btn_del" onClick={del}>
          {" "}
          삭제
        </button>
      </td>
    </tr>
  );
}

// REST API
// URI 주소와 메서드로 CRUD요청을 하는 것

// Create : POST / Read : GET / Update : PUT / Delete : DELETE
