import React, { useState } from "react";
import Axios from "axios";
import Cookies from "universal-cookie";
import './Login.css';
import Swal from 'sweetalert2';

function Login({ setIsAuth }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const cookies = new Cookies();

  const logIn = () => {
    Axios.post("http://localhost:3001/login", {
      username,
      password,
    }).then((res) => {
      const { token, userId, firstName, lastName, username } = res.data;
      

      if (!token || !userId || !firstName || !lastName || !username) {

        return Swal.fire({ //show error when user not fill all fields
          icon: 'error',
          title: 'Oops...',
          text: 'Username or password is incorrect..!',
        })

      } else {
        Swal.fire({ //show success message when user created
          position: 'center',
          icon: 'success',
          title: 'Login successful',
          showConfirmButton: false,
          timer: 2500
        })
      }


      //set all cookies
      cookies.set("token", token);
      cookies.set("userId", userId);
      cookies.set("firstName", firstName);
      cookies.set("lastName", lastName);
      cookies.set("username", username);
      setIsAuth(true);
    });
  };

  return (
    <div className="logIn">
      <label>Login</label>

      <br />
      <input className="txt-box"
        placeholder="User Name"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />

      <br />
      <input className="txt-box"
        type="password"
        placeholder="Password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      <br />
      <button className="login-btn" onClick={logIn}>Login</button>
    </div>
  );
}

export default Login;
