import { NavLink } from "react-router-dom";
import styles from './Header.module.css'; // Importa il modulo CSS

export default function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <div className="container">
          <ul className={`nav ${styles.navList}`}>
            <li>
              <NavLink
                to="/"
                className={`${styles.navLink} ${styles.transition}`}
              >
                Homepage
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={`${styles.navLink} ${styles.transition}`}
              >
                Contact us
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={`${styles.navLink} ${styles.transition}`}
              >
                About
              </NavLink>
            </li>
            {/* <li>
              <NavLink
                to="/form"
                className={`${styles.navLink} ${styles.transition}`}
              >
                Form
              </NavLink>
            </li> */}
          </ul>
        </div>
      </nav>
    </header>
  );
}