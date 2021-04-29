import styles from "../styles/Home.module.css";
import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";
import config from "../config/config";
const Layout = (props) => {
  const router = useRouter();
  const topButton = () => {
    return (
      <div className={styles.boxmenu}>
        <button
          className={styles.mainmenu}
          onClick={() => {
            router.push("/");
          }}>HOMEPAGES</button>
        <button
          className={styles.mainmenu}
          onClick={() => {
            router.push("/shop");
          }}>GUN</button>
        <button
          className={styles.mainmenu}
          onClick={() => {
            router.push("/login");
          }}>LOGIN</button>
        <button
          className={styles.mainmenu}
          onClick={() => {
            axios
              .get(`${config.URL}/logout`, { withCredentials: true })
              .then((res) => {
                // console.log(res);
                localStorage.removeItem("userid");
                window.location.reload();
              })
              .catch((error) => {
                console.log(error);
              });
          }}>LOGOUT</button>
      </div>
    );
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>BLACK SHOP</title>
      </Head>
      <main className={styles.main} style={{backgroundImage: "url(image/camo.png)"}}>
        <div className="row-justify-between">
          <div className="rows">
            <img className={styles.logo} src={"image/icon.jpg"}></img>
            <h1  className={styles.title}>BLACK SHOP GUN STORE</h1>
          </div>
          <div>{topButton()}</div>
        </div>
        <div>{props.children}</div>
      </main>
    </div>
  );
};

export default Layout;

export function getServerSideProps({ req, res }) {
  return { props: { token: req.cookies.token || "" } };
}
