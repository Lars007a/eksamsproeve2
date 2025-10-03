import styles from "./navbar.module.css";
import logo from "../../assets/logo.png";
import { Link, NavLink, useLocation } from "react-router-dom";
import cartImg from "../../assets/basket_icon.png";
import { useEffect, useState } from "react";
import useCart from "../../hooks/useCart.jsx";

export default function Navbar() {
  const [active, setActive] = useState(false); /* om den fulde, mobil hamburger clicked, nav er aktiv. */
  const [scrollActive, setScrollActive] = useState(false); /* om scroll effekten er aktiv. */

  const [showNav, setShowNav] = useState(true); /* om navbaren overhovedet skal vises. */
  const loc = useLocation(); /* få at få urlet. */

  const cart = useCart(); /* kurven */
  const [cartLength, setCartLength] = useState(0); /* hvor mange produkter der er i kurven */

  useEffect(() => {
    //Beregner hvor mange produkter der er i kurven.
    let temp = 0;
    for(let i = 0; i < cart.cart.length; i++) {
      temp = temp + cart.cart[i].ammount;
    }
    setCartLength(temp);
  }, [cart.cart])

  useEffect(() => {
    //Fjerner navbaren fra /backoffice.
    if(loc.pathname.includes("/backoffice")) {
      setShowNav(false);
    }else setShowNav(true);

  }, [loc, loc.pathname])

  //Toggle function til hamburger click.
  const toggle = (event) => {
    if (active) {
      setActive(false);
    } else {
      setActive(true);
    }
  };

  //Handlescroll function, der bliver tilføjet i useEffect når siden loader.
  const handleScroll = (event) => {
    if (window.scrollY > 150) {
      setScrollActive(true);
    } else {
      setScrollActive(false);
    }
  };

  //Når siden loader, tilføj scroll handler, der tilføjer scrolleffect.
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
