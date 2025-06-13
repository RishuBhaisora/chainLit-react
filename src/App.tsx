import { useEffect } from "react";

import { sessionState, useChatSession } from "@chainlit/react-client";
import { useRecoilValue } from "recoil";
import Playground from "./components/playground";

const userEnv = {};

function App() {
  const { connect } = useChatSession();
  const session = useRecoilValue(sessionState);

  useEffect(() => {
    console.log('session', session);
    if (session?.socket.connected) {
      return;
    }
    fetch("http://localhost:80/custom-auth", {credentials: "include"})
      .then(() => {
        connect({
          userEnv
        });
      });
  }, [connect, session]);

  return (
    <>
      <div>
        <Playground />
      </div>
    </>
  );
}

export default App;