// import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Word, { IWord } from "./Word";

export default function Day() {
  // dummy.words
  const { day } = useParams<{ day: string }>();
  // 상기의 코드는 하기와 같이 쓸수있음
  // const a = useParams();
  // const day = a.day;
  // const wordList = dummy.words.filter((word) => word.day === Number(day));

  const words: IWord[] = useFetch(`http://localhost:3001/words?day=${day}`);

  // const [words, setWords] = useState([]);

  // useEffect(() => {
  //   fetch(`http://localhost:3001/words?day=${day}`)
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data) => {
  //       setWords(data);
  //     });
  // }, [day]);

  return (
    <div>
      <h2>Day {day}</h2>
      {words.length === 0 && <span>Loading...</span>}
      <table>
        <tbody>
          {words.map((word) => (
            <Word word={word} key={word.id} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

// data.json에서 words만 map으로 반복을 돌려 가져온다.
// 페이지로 이동했을때 내용을 바꾸기 위해서 useParams hook을 이용
// useParams를 이용하면 App.js에서 path로 지정해줬던 /:day 이 부분이 useParams의 값으로 들어오게됨(key값은 당연히 day. :id로 썼다면 키값은 id로 들어올 것). 따라서 우리가 DayList에서 day.day로 지정해줬기때문에 day1로 이동하면 a는 1이고 day2로 이동하면 값이 2가 되는것. 상기처럼
// 그리고 filter로 해당하는 day의 단어들만 보여주도록 설정. 근데 여기서 중요한 것은 word.day와비교하는 useParams의 day는 문자열인데 우리의 word.day(data.json안의)는 숫자이기 떄문에 day를 숫자로 바꿔서 비교해줘야 페이지의 단어들이 나옴
