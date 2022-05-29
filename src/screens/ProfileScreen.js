import React, { useEffect, useState } from "react";
import "./ProfileScreen.css";
import Nav from "../Nav";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import {selectUser} from "../features/userSlice";
import {firebase} from "../firebase";
function ProfileScreen()
{
    const [locationKeys,setLocationKeys]=useState([]);
    const history=useHistory();
    useEffect(()=>{
        return history.listen(location =>{
            if(history.action==='PUSH'){
                setLocationKeys([location.key]);
            }
            if(history.action==='POP'){
                if(locationKeys[1]===location.key){
                    setLocationKeys(([ _,...keys])=>keys);
                }
                else
                {
                    setLocationKeys((keys)=>[location.key,...keys]);
                    window.location.reload();
                }
            }
        })
    })
    const signout=(e)=>{
        e.preventDefault();
        firebase.auth().signOut();
        history.push("/");
        // window.location.reload();
    }
    const style={color:"#fff"};
    const user=useSelector(selectUser);
    return(
        <>
        <div className="profileScreen loginScreen__gradient">
            <Nav/>
            <center>
            <div className="profileScreen__body">
                <h1>Sign Out?</h1>
                <img className="imgg" src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/366be133850498.56ba69ac36858.png" alt="" />
                <div className="profileScreen__info">
                <div className="profileScreen__details">
                    <h2>{user.email}</h2>
                    <div className="profileScreen_plans">
                        <button onClick={signout} className="profileScreen__signOut">
                            Sign Out
                        </button>
                    </div>
                </div>
                </div>
            </div>
            </center>
        </div>
        </>
    );
}
export default ProfileScreen;