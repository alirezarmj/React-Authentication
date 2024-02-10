import { useContext, useRef, useState } from "react";

import classes from "./AuthForm.module.css";
import toast from "react-hot-toast";
import { CgSpinner } from "react-icons/cg";
import { AuthContext } from "../../store/AuthContext";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const authCtx = useContext(AuthContext);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const navigate = useNavigate();
  async function submitHandler(event) {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    setIsLoading(true);
    // VALIDATION:
    if (isLogin) {
      try {
        //BASE ON FIREBASE AUTH REST API
        const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyANY2eJheZlCWnaXT5uYSQttN6qrDqoDfo", {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (response.ok) {
          // const expirationTime = new Date(new Date().getTime() + +data.expiresIn * 1000);
          authCtx.login(data.idToken);
          navigate("/");
          console.log(data);
          toast.success("User login successfuly!");
        } else {
          let errorMessage = "Sign in faild!";
          if (data && data.error && data.error.message) {
            errorMessage = data.error.message;
            if (errorMessage.split(":").length > 1) {
              toast.error(errorMessage.split(":")[1]);
              // console.log(errorMessage.split(":"));
              // console.log(data.error.message);
            } else {
              toast.error(errorMessage);
            }
          }
        }
      } catch (error) {
        console.error("An error occurred:", error.message);
        toast.error(error.message);
        // Handle the error as needed
        // toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        const response = await fetch("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyANY2eJheZlCWnaXT5uYSQttN6qrDqoDfo", {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        if (response.ok) {
          toast.success("Account created successfuly!");
        } else {
          let errorMessage = "Sign up faild!";
          if (data && data.error && data.error.message) {
            errorMessage = data.error.message;
            if (errorMessage.split(":").length > 1) {
              toast.error(errorMessage.split(":")[1]);
              // console.log(errorMessage.split(":"));
              // console.log(data.error.message);
            } else {
              toast.error(errorMessage);
            }
          }
        }
      } catch (error) {
        console.error("An error occurred:", error.message);
        toast.error(error.message);
        // Handle the error as needed
        // toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    }
  }
  console.log(authCtx.token);
  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" ref={emailInputRef} required />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input type="password" id="password" ref={passwordInputRef} required />
        </div>
        <div className={classes.actions}>
          <button>
            {isLogin ? (
              "Login"
            ) : (
              <div className=" flex items-center space-x-2">
                {isLoading && <CgSpinner size={20} className=" animate-spin" />}
                <span>Create Account</span>
              </div>
            )}
          </button>
          <button type="button" className={classes.toggle} onClick={switchAuthModeHandler}>
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
