import React from "react";
import Day from "./component/Day";
import DayList from "./component/DayList";
import Header from "./component/Header";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import EmptyPage from "./component/EmptyPage";
import CreateWord from "./component/CreateWord";
import CreateDay from "./component/CreateDay";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="App">
          <Header />
          {/* switch 내부는 url에 따라 각각 다른 페이지를 보여주고 swtich의 외부는 모든페이지에 공통으로 노출됨 */}
          <Switch>
            {/* path에 /는 첫페이지를 의미하고 exact를 붙여줘야 정확히 /일때만 이 페이지를 보여주고 아니면 Switch로 라우터를 감쌀경우 일치하는 첫번째 결과를 바로 보여주기 때문에 /Day에도 /가 포함되어 있기 때문에 Day가 아닌 DayList를 보여주게 됨 */}
            <Route exact path="/">
              <DayList />
            </Route>
            <Route path="/day/:day">
              <Day />
            </Route>
            <Route path="/create_word">
              <CreateWord />
            </Route>
            <Route path="/create_day">
              <CreateDay />
            </Route>

            {/* 만들어준 emptypage를 path없이 적어주면 상기의 페이지가 모두 만족하지 않을떄 path없는 페이지를 보여줌. 주의점은 이 emptypage를 제일 위에 적어주면 모든 페이지가 다 이쪽으로 이동하기 때문에 주의해야함.*/}
            <Route>
              <EmptyPage />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
