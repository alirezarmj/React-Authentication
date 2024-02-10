import { useContext, useRef } from "react";
import classes from "./ProfileForm.module.css";
import { AuthContext } from "../../store/AuthContext";
import { useNavigate } from "react-router-dom";

const ProfileForm = () => {
  const newPasswordRef = useRef();
  const authCtx = useContext(AuthContext);
  console.log(authCtx.token);
  const navigate = useNavigate();
  function handleSubmit(event) {
    event.preventDefault();
    const newPassword = newPasswordRef.current.value;
    fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyANY2eJheZlCWnaXT5uYSQttN6qrDqoDfo", {
      method: "POST",
      body: JSON.stringify({
        idToken: authCtx.token,
        password: newPassword,
        returnSecureToken: false,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        res.json();
        navigate("/");
      })
      .then((data) => console.log(data));
  }
  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <div className={classes.control}>
        <label htmlFor="new-password">New Password</label>
        <input type="password" id="new-password" ref={newPasswordRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
};

export default ProfileForm;
