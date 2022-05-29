import React from "react";
import "./HomeScreen.css";
import Nav from "../Nav.js";
import Banner from "../Banner";
import { db } from "../firebase";
import { useSelector } from "react-redux";
import {selectUser} from "../features/userSlice";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  arrayUnion, arrayRemove, increment
} from "firebase/firestore";
import Row from "../Row";
import requests from '../requests';
import Search from "../search";
import Sorter from "../Sorter";
import {useState,useEffect} from "react";
import Recommender from "../Recommender";
import Explorer from "./Explorer";
const genres = [{
    "id": 28,
    "name": "Action",
    "active": false
  },
  {
    "id": 12,
    "name": "Adventure",
    "active": false
  },
  {
    "id": 16,
    "name": "Animation",
    "active": false
  },
  {
    "id": 35,
    "name": "Comedy",
    "active": false
  },
  {
    "id": 80,
    "name": "Crime",
    "active": false
  },
  {
    "id": 99,
    "name": "Documentary",
    "active": false
  },
  {
    "id": 18,
    "name": "Drama",
    "active": false
  },
  {
    "id": 10751,
    "name": "Family",
    "active": false
  },
  {
    "id": 14,
    "name": "Fantasy",
    "active": false
  },
  {
    "id": 36,
    "name": "History",
    "active": false
  },
  {
    "id": 27,
    "name": "Horror",
    "active": false
  },
  {
    "id": 10402,
    "name": "Music",
    "active": false
  },
  {
    "id": 9648,
    "name": "Mystery",
    "active": false
  },
  {
    "id": 10749,
    "name": "Romance",
    "active": false
  },
  {
    "id": 878,
    "name": "Science Fiction",
    "active": false
  },
  {
    "id": 10770,
    "name": "TV Movie",
    "active": false
  },
  {
    "id": 53,
    "name": "Thriller",
    "active": false
  },
  {
    "id": 10752,
    "name": "War",
    "active": false
  },
  {
    "id": 37,
    "name": "Western",
    "active": false
  }];
function HomeScreen()
{
    const [recommend,setRecommend]=useState(false);
    const [explore,setExplore]=useState(true);
    const user=useSelector(selectUser);
    const getSnap=async()=>{
    await setDoc(doc(db,"users",user.email),{
        isClick:increment(0)
    },{merge:true})};
    const docRef=doc(db,"users",user.email);
    const [data,setData]=useState(false);
    const getData=async()=>{
        const docSnap=await getDoc(docRef);
        if(docSnap.exists())
        {
            setData(docSnap.data());
            console.log(data);
            setRecommend(true);
            setExplore(false);
        }
        else
        {
            getSnap();
            setRecommend(true);
            setExplore(false);
        }
    }
    const handleRecommend=()=>{
      getData();
    }
    const handleExplore=()=>{
      setExplore(true);
      setRecommend(false);
    }
    return <div className="homeScreen">
        <Nav/>
        <Banner/>
        {/* <Sorter/> */}
        <center><div className="navigation_buttons">
        
        {explore?<button className={!recommend?"tags scroll":"tap scroll"} onClick={()=>{handleRecommend()}}>Recommended For You</button>:
        <button className={!explore?"tags scroll":"tap scroll"} onClick={()=>{handleExplore()}}>Explore Movie Collections</button>}</div></center>
        {explore?<Explorer/>:<Recommender data={data}/>}
        
    </div>
}
export default HomeScreen;