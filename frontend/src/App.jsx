import { useState } from "react";
import Join from "./components/Join";
import Chat from "./components/Chat";

function App() {
  const [user, setUser] = useState(null);

  return (
    <>
      {!user ? <Join setUser={setUser} /> : <Chat user={user} />}
    </>
  );
}

export default App;