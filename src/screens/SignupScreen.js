import React,{useRef} from "react";
import "./SignupScreen.css";
import {firebase} from "../firebase";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function SignupScreen()
{
    const history=useHistory();
    const emailRef=useRef(null);
    const passwordRef=useRef(null);
    const register=(e)=>{
        e.preventDefault();
        firebase.auth().createUserWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        ).then((authUser)=>{
            console.log(authUser);
            // window.location.reload();
        }).catch(error=>{
            alert(error.message);
        });
    };
    const signIn=(e)=>{
        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        ).then((authUser)=>{
            console.log(authUser);
            // window.location.reload();
        }).catch(error=>{
            alert(error.message);
        });
    };
    return(
        <div className="signupScreen">
            <form>
                <h1>Sign In</h1>
                <input ref={emailRef} type="Email" placeholder="Enter your Email"/>
                <input ref={passwordRef} type="Password" placeholder="Enter your Password"/>
                <button type="submit" onClick={signIn}>Sign In</button>
                <h4>
                <span className="signupScreen__gray">New to Cinemaos? </span> 
                <span className="signupScreen__link" onClick={register}>Sign Up now.</span>
                </h4>
            </form>
        </div>
    );

}
export default SignupScreen;