import Head from "next/head";
import Layout from "../components/layout";
import { useState } from "react";
import styles from "../styles/login.module.css";
import axios from "axios";
import config from "../config/config";
import { useRouter } from "next/router";

export default function Login({ token }) {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const isLogin = () => {
    if (token == "") {
      return (
        <div>
          <p className={styles.title}>LOGIN HERE</p>
          <div
            style={{ marginBottom: "10px", marginTop: "30px" }}
            className="rows"
          >
            <p>RESGISTER HERE =></p>
            <button
              onClick={() => {
                router.push("/register");
              }}
              className={styles.registerButton}
            >
              REGISTER
            </button>
          </div>
          <div className="column">
            <input
              onChange={(e) => setUsername(e.target.value)}
              className={styles.input}
              placeholder="Username"
            ></input>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              placeholder="Password"
            ></input>
            <button onClick={() => login()} className={styles.button}>
              LOGIN
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="rows">
          <p className={styles.title}>LOGIN SUCESS</p>
        </div>
      );
    }
  };
  const login = async () => {
    let result = await axios
      .post(
        `${config.URL}/login`,
        { username, password },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
        localStorage.setItem("userid", res.data.user.id);
        window.location.replace("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return <Layout>{isLogin()}</Layout>;
}

export function getServerSideProps({ req, res }) {
  return { props: { token: req.cookies.token || "" } };
}
