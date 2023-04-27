import React, { useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";
import './SignUp.css';

function SignUp({ setIsAuth }){
  const cookies = new Cookies();
  const [user, setUser] = useState(null);

  const signUp = () => {
    Axios.post("http://localhost:3001/signup", user).then((res) => {
      const { token, userId, firstName, lastName, username, hashedPassword } =
        res.data;

      //set all cookies
      cookies.set("token", token);
      cookies.set("userId", userId);
      cookies.set("firstName", firstName);
      cookies.set("lastName", lastName);
      cookies.set("username", username);
      cookies.set("hashedPassword", hashedPassword);
      setIsAuth(true);
    });
  };

  return (
    <div className="signUp">
      <label>SignUp form</label>

      <input className="txt-box"
        placeholder="First Name"
        onChange={(event) => {
          setUser({ ...user, firstName: event.target.value }); // save to user object what user inputs
        }}
      />

      
      <input className="txt-box"
        placeholder="Last Name"
        onChange={(event) => {
          setUser({ ...user, lastName: event.target.value });
        }}
      />

      <input className="txt-box"
        placeholder="User Name"
        onChange={(event) => {
          setUser({ ...user, username: event.target.value });
        }}
      />

      <input className="txt-box"
        type="password"
        placeholder="Password"
        onChange={(event) => {
          setUser({ ...user, password: event.target.value });
        }}
      />

      <button className="signup-btn" onClick={signUp}>Sign Up</button>
    </div>
  );
}

export default SignUp;
