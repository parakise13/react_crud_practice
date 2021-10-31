import { Link } from "react-router-dom";

export default function EmptyPage() {
  return (
    <>
      <h2>잘못된 접근입니다.</h2>
      <Link to="/">돌아가기</Link>
    </>
  );
}

// 일치하지 않는 주소로 이동했을때 빈페이지를 보여주기 위해서 만든 페이지
// 예를들어 day/xxxx 주소로 이동했다거나 data.json내의 day와 일치하지 않는 경우
