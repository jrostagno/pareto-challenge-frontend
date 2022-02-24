import axios from "axios";
import React from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import styles from "./Modal.module.css";

export default function Modal() {
  const [info, setInfo] = useState("");

  let navigate = useNavigate();

  function handleOnChange(e) {
    setInfo({
      ...info,

      [e.target.name]: e.target.value,
    });
  }

  async function handleOnClick() {
    try {
      const token = localStorage.getItem("jwt" || []);

      axios.post(
        "http://localhost:1337/arrivals",
        { action: info.action, timestamp: new Date(), employee: info.employee },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (info.action === "arrive")
        Swal.fire({
          icon: "success",
          title: "Arrival Registered! ",
        });
      if (info.action === "leave")
        Swal.fire({
          icon: "success",
          title: "Checked out! ",
        });
    } catch (err) {
      console.log(err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong !",
      });
    }
  }

  function handleOnClickLogOut() {
    navigate("/");
  }

  return (
    <>
      <div className={styles.bigContent}>
        <div className={styles.content}>
          <button
            type="button"
            className={styles.logout}
            onClick={handleOnClickLogOut}
          >
            LOGOUT ...
          </button>
          <h1>REGISTER</h1>
          <div className={styles.innerContent}>
            <div className={styles.inputDivs}>
              <label>Employee name</label>
              <input
                type="text"
                name="employee"
                onChange={(e) => handleOnChange(e)}
              ></input>
            </div>
            <div className={styles.inputDivs}>
              <label>Action</label>
              <select name="action" onChange={(e) => handleOnChange(e)}>
                <option></option>
                <option value="arrive"> Arrive</option>
                <option value="leave">Leave</option>
              </select>
            </div>
            <div>
              <button type="button" onClick={handleOnClick}>
                PUNCH IN
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
