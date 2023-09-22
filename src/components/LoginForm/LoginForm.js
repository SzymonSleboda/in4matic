import EmailIcon from "../../images/icons/email.svg";
import PasswordIcon from "../../images/icons/password.svg";
import LogoIcon from "../../images/icons/logo.svg";
import { Button } from "../UIElements/Button/Button";
import styles from "./LoginForm.css";
export const LoginForm = () => {
  return (
    <div className='loginForm'>
      <div>
        <div className='loginFormHeader'>
          <img src={LogoIcon}></img>
       
        </div>
        <form>
          <label className='textField loginFormField'>
            <img src={EmailIcon}></img>

            <input placeholder='E-mail' className='input'></input>
          </label>
          <label className='textField loginFormField'>
            <img src={PasswordIcon}></img>

            <input
              placeholder='Password'
              className='input inputPassword'></input>
          </label>
          <Button
            className='btn primary loginFormField'
            color='primary'
            onClick={() => {
              console.log("rr");
            }}
            type='submit'>
            Log in
          </Button>
          <Button
            className='btn secondary  loginFormField'
            color='secondary'
            type='button'>
            Register
          </Button>
        </form>
      </div>
    </div>
  );
};
