import { useCallback, useEffect, useMemo, useState } from "react";
import socket from "./logic/socket";
const sock = new socket();
function App() {
  //
  const [regObj, setRegObj] = useState({
    alert: "",
    isOk: false,
  });
  //

  const [name, setName] = useState("");
  const [isBlocked, setIsBlocked] = useState(false);
  const [asnwerUser, setAnswerUser] = useState("");
  const [score, setScore] = useState({});

  // callbacks
  const nameChange = useCallback((ev) => {
    setName(ev.target.value);
  }, []);
  const onRegister = useCallback(() => {
    sock.register(name);
  }, [name]);
  const onAnswer = useCallback(() => {
    sock.answer(name);
  }, [name]);
  const setAnswer = useCallback((isBlck) => {
    sock.setBlock(isBlck);
  }, []);
  const deleteUsers = useCallback((isBlck) => {
    sock.deleteAll();
  }, []);
  const addScore = useCallback((sc) => {
    sock.addScore(sc);
  }, []);
  //
  const displayLogin = useMemo(() => {
    return !regObj.alert || (!!regObj.alert && !regObj.isOk);
  }, [regObj]);

  const displayScore = useMemo(() => {
    const disp = [];

    for (let sc in score) {
      if (sc !== "admin")
        disp.push(
          <>
            <div key={sc}>
              {sc}: {score[sc]}
            </div>
          </>
        );
    }
    return disp;
  }, [score]);
  //
  useEffect(() => {
    sock.init({
      setMsg: setRegObj,
      setBlocked: setIsBlocked,
      setAnswerUser,
      setScore,
    });
  }, []);

  return (
    <div className="App">
      {displayLogin && (
        <>
          <input onChange={nameChange} value={name} />
          <button onClick={onRegister}>Войти</button>
          <br />
          {regObj.alert}
        </>
      )}
      {!displayLogin && (
        <>
          {name}
          <br />
          {name === "admin" ? (
            <>
              Отвечает: {asnwerUser || " - "}
              {asnwerUser && (
                <>
                  <button onClick={() => addScore(1)}>Верно</button>
                  <button onClick={() => addScore(0)}>Неверно</button>
                </>
              )}
              <br />
              Пользователи: {isBlocked ? "Заблокированы" : "Разблокированы"}
              <br />
              <button onClick={() => setAnswer(true)}>Заблокировать</button>
              <br />
              <button onClick={() => setAnswer(false)}>Разблокировать</button>
              <br />
              <button onDoubleClick={deleteUsers}>Обнулить игроков</button>
              <br />
              <br />
              Участники:
              <br />
              {displayScore}
            </>
          ) : (
            <button onClick={onAnswer} disabled={isBlocked}>
              Ответить
            </button>
          )}
        </>
      )}
    </div>
  );
}

export default App;
