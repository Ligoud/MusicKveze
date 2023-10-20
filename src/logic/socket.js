// const connection = new WebSocket("ws:/localhost:8080");
const connection = new WebSocket("wss://musickveze-y9bt6thg.b4a.run/");
connection.onopen = () => {
  console.log("connected");
};

export default class OwnSocket {
  init({ setMsg, setBlocked, setAnswerUser, setScore }) {
    connection.onmessage = ({ data }) => {
      const resData = JSON.parse(data);

      switch (resData.type) {
        case "login":
          setMsg({
            alert: resData.alert,
            isOk: resData.isOk,
          });
          break;
        case "answer":
          console.log(resData);
          setBlocked(resData.isBlocked);
          setAnswerUser(resData.answerUser);
          break;
        case "score":
          setScore(resData.score);
          setAnswerUser(resData.answerUser);
          break;
        default:
          break;
      }
    };
  }
  register(name) {
    connection.send(JSON.stringify({ type: "login", name }));
    //
  }

  answer(name) {
    connection.send(JSON.stringify({ type: "answer", name }));
  }

  setBlock(isBlocked) {
    connection.send(JSON.stringify({ type: "setblock", isBlocked }));
  }

  addScore(score) {
    connection.send(JSON.stringify({ type: "addscore", score }));
  }
  deleteAll() {
    connection.send(JSON.stringify({ type: "deleteAll" }));
  }
  deleteScore() {
    connection.send(JSON.stringify({ type: "deletescore" }));
  }
  clear() {
    connection.send(JSON.stringify({ type: "clear" }));
  }
}
