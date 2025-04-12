import { useDispatch } from "react-redux";
import { register } from "../redux/auth/operations";
import css from "./RegisterForm.module.css";

export default function RegisterForm() {
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.elements.email.value;
    const password = form.elements.password.value;
    const name = form.elements.name.value;
    console.log("Logging in with:", { email, password, name });

    dispatch(
      register({
        name,
        email,
        password,
      })
    );

    form.reset();
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label className={css.label}>
        username
        <input type="text" name="name" required />
      </label>
      <label className={css.label}>
        email
        <input type="email" name="email" required />
      </label>
      <label className={css.label}>
        password
        <input type="password" name="password" required />
      </label>
      <button type="submit" className={css.button}>
        Register
      </button>
    </form>
  );
}
