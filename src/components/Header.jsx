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
                activeClassName={styles.activeLink}
              >
                Homepage
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={`${styles.navLink} ${styles.transition}`}
                activeClassName={styles.activeLink}
              >
                Contact us
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={`${styles.navLink} ${styles.transition}`}
                activeClassName={styles.activeLink}
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/form"
                className={`${styles.navLink} ${styles.transition}`}
                activeClassName={styles.activeLink}
              >
                Form
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}