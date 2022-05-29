import React,{useEffect} from 'react';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import LoginScreen from './screens/LoginScreen';
import {firebase} from "./firebase";
import {useDispatch, useSelector} from "react-redux";
import {login,logout,selectUser} from "./features/userSlice";
import ProfileScreen from './screens/ProfileScreen';
import { useHistory } from 'react-router-dom';

function App()
{
  const user=useSelector(selectUser);
  const dispatch=useDispatch();
  const history=useHistory();
  useEffect(()=>{
    const unsubscribe=firebase.auth().onAuthStateChanged(userAuth =>{
      if(userAuth)
      {
        dispatch(login({
          uid:userAuth.uid,
          email:userAuth.email,
        }));
      }
      else
      {
        dispatch(logout());
      }
    })
    return unsubscribe;
  },[dispatch]);
  return(
    <div className='App'>
      <Router>
        <Switch>
        {user?
        (
          <Switch><Route exact path="/profile">
              <ProfileScreen />
            </Route><Route exact path="/">
                <HomeScreen />
              </Route></Switch>
      ):
      <Route exact path="/"><LoginScreen/></Route>}
        </Switch>
      </Router>
    </div>
  );
}


export default App;