import Layout from "../components/layout";
import { useState, useEffect } from "react";
import styles from "../styles/shop.module.css";
import axios from "axios";
import config from "../config/config";
import { useRouter } from "next/router";
import CheckRouter from "../components/checkrouter";

const Shop = ({ token }) => {
  const router = useRouter();
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  useEffect(async () => {
    setUserid(localStorage.getItem("userid"));
  });
  const productList = [
    { id: "m4", productName: "M4A1", price: 1500 },
    { id: "mp5", productName: "MP5", price: 1000 },
    { id: "m9", productName: "M9", price: 850 },
    { id: "m14", productName: "M14", price: 3500 },
    { id: "m24", productName: "M24", price: 3000 },
    { id: "sh", productName: "SCAR-H", price: 2000 },
    { id: "sl", productName: "SCAR-L", price: 1800 },
    { id: "416", productName: "HK-416", price: 1500 },
    { id: "47", productName: "AK-47", price: 1250 },
    { id: "svd", productName: "SVD", price: 2000 },
    { id: "pm", productName: "Makarov PM", price: 700 },
    { id: "1014", productName: "M1014", price: 1150 },
  ];
  const addtocart = async (item) => {
    console.log(item);
    let productName = item.productName;
    let quantity = 1;
    let price = item.price;
    await axios
      .post(
        `${config.URL}/addtocart`,
        { userid, productName, quantity, price },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Layout>
      <div>
        <div className={styles.cart}>
          <img
            onClick={() => {
              router.push("/cart");
            }}
            className={styles.cartIcon}
            src={"image/cart.png"}
          ></img>
        </div>
        <div className={styles.productBox}>
          <div className={styles.productList}>
            {productList.map((item) => {
              return (
                <div key={item.id}>
                  <img
                    className={styles.productImage}
                    src={`image/guns/${item.id}.jpg`}
                  ></img>
                  <div className={styles.productDetial}>
                    <p className={styles.productName}>{item.productName}</p>
                    <p className={styles.productName}>{item.price}$</p>
                    <button
                      onClick={() => addtocart(item)}
                      className={styles.addCartButton}
                    >
                      ADD GUN TO CART
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckRouter(Shop);

export function getServerSideProps({ req, res }) {
  return { props: { token: req.cookies.token || "" } };
}
