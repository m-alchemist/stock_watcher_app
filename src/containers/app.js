import { socketConnect } from 'socket.io-react';

function App(props) {
  function sendMessage() {
    props.socket.emit('message', 'Hello world!');
  }

  return (
    <button onClick={sendMessage}>
      Send!
    </button>
  );
}

export default socketConnect(App);
