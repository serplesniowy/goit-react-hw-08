import { useDispatch } from "react-redux";
import { logIn } from "../redux/auth/operations";
import css from "./LoginForm.module.css";

export default function LoginForm() {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.elements.email.value;
    const password = form.elements.password.value;

    console.log("Logging in with:", { email, password });

    dispatch(
      logIn({
        email,
        password,
      })
    );

    form.reset();
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label className={css.label}>
        email
        <input type="email" name="email" required />
      </label>
      <label className={css.label}>
        password
        <input type="password" name="password" required />{" "}
      </label>
      <button type="submit" className={css.button}>
        Login
      </button>
    </form>
  );
}
