import { useCallback, useEffect, useMemo, useState } from "react";
import socket from "./logic/socket";
import SlimeButton from "./components/SlimeButton";
const sock = new socket();

function App() {
  //
  const [regObj, setRegObj] = useState({
    alert: "",
    isOk: false,
  });
  //

  const [name, setName] = useState("");
  const [isBlocked, setIsBlocked] = useState(true);
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
  const deleteUsers = useCallback(() => {
    sock.deleteAll();
  }, []);
  const addScore = useCallback((sc) => {
    sock.addScore(sc);
  }, []);
  const deleteScore = useCallback(() => {
    sock.deleteScore();
  }, []);
  const clear = useCallback(() => {
    sock.clear();
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
    <div
      style={
        name == "admin" && !displayLogin
          ? {}
          : {
              position: "absolute",
              width: "100vw",
              height: "100vh",
              // background: "rgb(145, 227, 210)",
              background:
                "radial-gradient(circle, rgba(145,227,210,1) 0%, rgba(66,64,131,1) 100%)",
              margin: 0,
              padding: 0,
            }
      }
    >
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
          <br />
          {name === "admin" ? (
            <>
              Отвечает: {asnwerUser || " - "}
              {asnwerUser && (
                <>
                  <br />
                  <button onClick={() => addScore(1)}>Верно</button>
                  <br />
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
              =============================================
              <br />
              <button onDoubleClick={deleteUsers}>Обнулить игроков</button>
              <br />
              <button onDoubleClick={deleteScore}>Обнулить счёт</button>
              <br />
              <br />
              <button onDoubleClick={clear}>!Очистить! </button>
              <br />
              <br />
              Участники:
              <br />
              {displayScore}
            </>
          ) : (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                width: "300px",
                height: "300px",
                userSelect: "none",
                WebkitUserSelect: "none",
              }}
            >
              <SlimeButton onClick={onAnswer} disabled={isBlocked} />
              {/* <button onClick={onAnswer} disabled={isBlocked}>
                Ответить
              </button> */}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
