import { NavLink } from "react-router-dom";
export default function Header() {
  return (
    <header>
      <ul className="nav d-flex justify-content-center gap-5  ">
        <li>
          <NavLink to="/books" className="myList major-mono-display-regular">
            Homepage
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" className="myList major-mono-display-regular">
            Contact us
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className="myList major-mono-display-regular">
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/form" className="myList major-mono-display-regular">
            Form
          </NavLink>
        </li>
      </ul>
    </header>
  );
}
