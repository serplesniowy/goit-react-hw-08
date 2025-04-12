import { Link } from "react-router-dom";
import AuthNav from "../AuthNav/AuthNav";
import UserNav from "../UserNav";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import ContactItem from "../ContactItem";
import css from "./Navigation.module.css";

export default function Navigation() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <nav className={css.nav}>
      <div className={css.left}>
        <Link className={css.link} to="/">
          Home
        </Link>
        {isLoggedIn && (
          <Link className={css.link} to="/contacts">
            Contacts
          </Link>
        )}
      </div>
      <div className={css.right}>{isLoggedIn ? <UserNav /> : <AuthNav />}</div>
    </nav>
  );
}
