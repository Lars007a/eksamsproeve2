import styles from "./navbar.module.css";
import logo from "../../assets/logo.png";
import { Link, NavLink } from "react-router-dom";
import cartImg from "../../assets/basket_icon.png";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [active, setActive] = useState(false);
  const [scrollActive, setScrollActive] = useState(false);

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
    <nav className={`${styles.nav} ${scrollActive ? styles.scroll : ""}`}>
      <div className={`container ${styles.content}`}>
        {/* logoet */}
        <a to="/">
          <div
            className={styles.logoImg}
            style={{ backgroundImage: `url(${logo})` }}
          />
        </a>
        {/* menu knapperne, som kurv og hamburger knappen. */}
        <div className={styles.btns}>
          <a href="#">
            <div
              className={styles.cartImg}
              style={{ backgroundImage: `url(${cartImg})` }}
            />
          </a>
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
          <ul>
            <li>
              <NavLink className={"titleFont"} to="/">
                Forside
              </NavLink>
            </li>
            <li>
              <NavLink className={"titleFont"} to="#">
                Personalet
              </NavLink>
            </li>
            <li>
              <NavLink className={"titleFont"} to="#">
                Kontakt
              </NavLink>
            </li>
            <li>
              <NavLink className={"titleFont"} to="#">
                Kurv
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
