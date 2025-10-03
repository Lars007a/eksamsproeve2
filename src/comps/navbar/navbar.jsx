import styles from "./navbar.module.css";
import logo from "../../assets/logo.png";
import { Link, NavLink, useLocation } from "react-router-dom";
import cartImg from "../../assets/basket_icon.png";
import { useEffect, useState } from "react";
import useCart from "../../hooks/useCart.jsx";

export default function Navbar() {
  const [active, setActive] = useState(false);
  const [scrollActive, setScrollActive] = useState(false);

  const [showNav, setShowNav] = useState(true);
  const loc = useLocation();

  const cart = useCart();
  const [cartLength, setCartLength] = useState(0);

  useEffect(() => {

    let temp = 0;
    for(let i = 0; i < cart.cart.length; i++) {
      temp = temp + cart.cart[i].ammount;
    }
    console.log(temp);
    setCartLength(temp);
  }, [cart.cart])

  useEffect(() => {
    if(loc.pathname.includes("/backoffice")) {
      setShowNav(false);
    }else setShowNav(true);

  }, [loc, loc.pathname])

  const toggle = (event) => {
    if (active) {
      setActive(false);
    } else {
      setActive(true);
    }
  };

  const handleScroll = (event) => {
    if (window.scrollY > 150) {
      setScrollActive(true);
    } else {
      setScrollActive(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); /* køre når component bliver mountet, og bliver renderet første gang kan man sige. */

  return (
      showNav ? <nav className={`${styles.nav} ${scrollActive ? styles.scroll : ""}`}>
      <div className={`container ${styles.content}`}>
        {/* logoet */}
        <NavLink to="/">
          <div
            className={styles.logoImg}
            style={{ backgroundImage: `url(${logo})` }}
          />
        </NavLink>
        {/* menu knapperne, som kurv og hamburger knappen. */}
        <div className={styles.btns}>
          <NavLink to={"/basket"}>
            <div
              className={styles.cartImg}
              style={{ backgroundImage: `url(${cartImg})` }}
            >
              <span className={styles.cartAmmount}>
                {cartLength}
              </span>
            </div>
          </NavLink>
          <div
            className={`${styles.hamburger} ${active ? styles.active : ""}`}
            onClick={toggle}
          >
            <div className={styles.line}></div>
            <div className={styles.line}></div>
            <div className={styles.line}></div>
          </div>
        </div>
        {/* selve menuen der åbner op */}
        <div className={`${styles.activeMenu} ${active ? styles.active : ""}`}>
          <ul onClick={() => {
            setActive(false);
          }}>
            <li>
              <NavLink className={"titleFont"} to="/">
                Forside
              </NavLink>
            </li>
            <li>
              <NavLink className={"titleFont"} to="/employees">
                Personalet
              </NavLink>
            </li>
            <li>
              <NavLink className={"titleFont"} to="/contact">
                Kontakt
              </NavLink>
            </li>
            <li>
              <NavLink className={"titleFont"} to="/basket">
                Kurv
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav> : ""
  );
}
