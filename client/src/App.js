import { useState } from "react";
import "./App.css";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { StreamChat } from "stream-chat";
import Cookies from "universal-cookie";
import JoinGame from "./components/JoinGame";
import { Chat } from "stream-chat-react";


function App() {
  const apiKey = "8sdjnb5cqnas";
  const cookies = new Cookies();
  const token = cookies.get("token");
  const client = StreamChat.getInstance(apiKey);
  const [isAuth, setIsAuth] = useState(false);

  //logout
  const logOut = () => {
    cookies.remove("token");
    cookies.remove("userId");
    cookies.remove("firstName");
    cookies.remove("lastName");
    cookies.remove("hashedPassword");
    cookies.remove("channelName");
    cookies.remove("username");
    client.disconnectUser(); //disconnect from stream platform
    setIsAuth(false);
  };

  if (token) {
    client
      .connectUser(
        {
          id: cookies.get("userId"),
          name: cookies.get("username"),
          firstName: cookies.get("firstName"),
          lastName: cookies.get("lastName"),
          hashedPassword: cookies.get("hashedPassword"),
        },
        token
      )
      .then((user) => {
        setIsAuth(true);
      });
  }
  return (
    <div className="App">
      {isAuth ? (
        <Chat client={client}>
          <JoinGame />
          
          <button className="logout-btn" onClick={logOut}> Logout </button>
          
          
        </Chat>
      ) : (
        <div className="reg-form">
          <SignUp  setIsAuth={setIsAuth} />
          <Login setIsAuth={setIsAuth} />
        </div>
      )}
    </div>
  );
}

export default App;
