import React, { useState } from "react";
import { useChatContext, Channel } from "stream-chat-react";
import Game from "./Game";
import CustomInput from "./CoustomInput";
import "./JoinGame.css";
import Swal from 'sweetalert2';


function JoinGame() {
  const [rivalUsername, setRivalUsername] = useState("");
  const { client } = useChatContext();
  const [channel, setChannel] = useState(null);


  //create session with other player
  const createChannel = async () => {
    const responce = await client.queryUsers({ name: { $eq: rivalUsername } });

    if (responce.users.length === 0) { // user can't found
      
      Swal.fire({
        title: "User not found...!",
        icon: "warning",
        backdrop: `rgba(0, 0, 0, 0.7)`
    });
      return
    }

    //when user exixtes create new channel
    const newChannel = await client.channel("messaging", {
      members: [client.userID, responce.users[0].id],  //members who has accsess for the game
    });

    await newChannel.watch(); //listen to channel connection 
    setChannel(newChannel);
  };
  return (
    <>

      {channel ? (
        <Channel channel={channel} Input={CustomInput}>
          <Game channel={channel} setChannel={setChannel} />
        </Channel>

      ) : (
        <div>
          <h1 className='main-title' >🐾 PAWS 🐭</h1>

          <div className="joinGame">
          
          <h3>Create Game</h3>
          <input className="txt-join-game"
            placeholder="Username of your partner"
            onChange={(event) => {
              setRivalUsername(event.target.value);
            }}
          />

          <button className="start-btn" onClick={createChannel}> Join / Start Game</button>
        </div>
        </div>

      )}
    </>
  );
}

export default JoinGame;
