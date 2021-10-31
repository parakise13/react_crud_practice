import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";

export interface IDay {
  id: number;
  day: number;
}

export default function DayList() {
  const days: IDay[] = useFetch("http://localhost:3001/days");

  if (days.length === 0) {
    return <span>Loading...</span>;
  }

  // const [days, setDays] = useState([]);

  // useEffect(() => {
  //   fetch("http://localhost:3001/days")
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data) => {
  //       setDays(data);
  //     });
  // }, []);

  return (
    <ul className="list_day">
      {days.map((day) => (
        <li key={day.id}>
          <Link to={`/day/${day.day}`}>Day {day.day}</Link>
        </li>
      ))}
    </ul>
  );
}

// data.json에서 days만 map으로 반복을 돌려 가져온다.
// 그리고 link to에는 해당하는 day만 url에 들어갈 수 있도록 day의 day를 넣어주고
// App.js의 path에 /:day를 넣어주면 각 날짜에 맞춰 이동을 하게됨.
// 그리고 해당하는 페이지의 내용을 바꾸기 위해 Day.js로 이동
