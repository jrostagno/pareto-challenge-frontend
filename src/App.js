import "./App.css";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function App() {
  const [input, setInputs] = useState("");

  let navigate = useNavigate();

  function handleOnChange(e) {
    setInputs({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  async function handleOnclick() {
    try {
      const { data } = await axios.post("http://localhost:1337/auth/local", {
        identifier: input.user,
        password: input.password,
      });

      if (data.jwt) {
        Swal.fire({
          icon: "success",
          title: "Succesfully registered user ! ",
        });
        localStorage.setItem("jwt", data.jwt);
        navigate("/punchin");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong ! User not found...",
        });
      }
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong ! User not found...",
      });
    }
  }

  return (
    <div className="App">
      <div className="global">
        <div className="contenLogin">
          <div className="content">
            <h1>ADMINISTRATOR</h1>
            <div className="divInputs">
              <label>User</label>
              <input
                name="user"
                type="text"
                onChange={(e) => handleOnChange(e)}
                placeholder="User name..."
                autoComplete="off"
              ></input>
            </div>
            <div className="divInputs">
              <label>Password</label>
              <input
                name="password"
                type="password"
                onChange={(e) => handleOnChange(e)}
                placeholder="Password"
                autoComplete="off"
              ></input>
            </div>

            <button onClick={handleOnclick}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
