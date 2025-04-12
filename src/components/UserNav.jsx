import { useDispatch } from "react-redux";
import { logOut } from "../redux/auth/operations";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/auth/selectors";
import css from "./UserNav.module.css";

export default function UserNav() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const userName = user?.name || "";

  const handleLoggOut = () => {
    dispatch(logOut());
  };

  return (
    <div className={css.wrapper}>
      <p className={css.username}>Welcome, {userName}</p>{" "}
      <button onClick={handleLoggOut}>Logout</button>
    </div>
  );
}
