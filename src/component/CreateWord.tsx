import React, { useRef, useState } from "react";
import { useHistory } from "react-router";
import useFetch from "../hooks/useFetch";
import { IDay } from "./DayList";

export default function CreateWord() {
  const days: IDay[] = useFetch("http://localhost:3001/days");
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!isLoading && dayRef.current && engRef.current && korRef.current) {
      setIsLoading(true);

      const day = dayRef.current.value;
      const eng = engRef.current.value;
      const kor = korRef.current.value;

      fetch(`http://localhost:3001/words/`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          day,
          eng,
          kor,
          isDone: false,
        }),
      }).then((res) => {
        if (res.ok) {
          alert("생성이 완료 되었습니다.");
          history.push(`/day/${day}`);
          // useHistory로 만든 history에 push해주면 해당 url로 이동함
          // Link to 처럼 a태그를 사용하지 않고 페이지를 전환시킬 때 유용함
          setIsLoading(false);
        }
      });
    }
  }

  const engRef = useRef<HTMLInputElement>(null);
  const korRef = useRef<HTMLInputElement>(null);
  const dayRef = useRef<HTMLSelectElement>(null);

  return (
    <form onSubmit={onSubmit}>
      <div className="input_area">
        <label>Eng</label>
        <input type="text" placeholder="computer" ref={engRef} />
      </div>
      <div className="input_area">
        <label>Kor</label>
        <input type="text" placeholder="컴퓨터" ref={korRef} />
      </div>
      <div className="input_area">
        <select ref={dayRef}>
          {days.map((day) => {
            return <option key={day.id}>{day.day}</option>;
          })}
        </select>
      </div>
      <button style={{ opacity: isLoading ? 0.3 : 1 }}>
        {isLoading ? "Saving..." : "저장"}
      </button>
    </form>
  );
}
