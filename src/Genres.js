import React, {useState,useEffect} from "react";
import { db } from "./firebase";
import { useSelector } from "react-redux";
import {selectUser} from "./features/userSlice";
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
import axios from './axios';
import "./Genres.css";
function Genres(movie_id)
{
    const user=useSelector(selectUser);
    const getSnap=async(year,runtime)=>{
    await setDoc(doc(db,"users",user.email),{
        year:increment(year),
        counter:increment(1),
        runtime:increment(runtime),
        isClick:increment(1)
    },{merge:true})};
    const [info,setInfo]=useState([]);
    const [release_date,setReleaseDate]=useState([]);
    const [runtime,setRuntime]=useState([]);
    let res;
    async function fetchData(){
        const request=await axios.get("/movie/"+movie_id.movie_id+"?api_key=d7f9c6e71e7e86cb66d0ce3838da986a");
        console.log(request.data);
        setInfo(request.data.genres);
        setRuntime(request.data.runtime);
        setReleaseDate(request.data.release_date);
        return request;
    }
    useEffect(()=>{fetchData();},[movie_id.movie_id]);
    res=release_date.slice(0,4);
    getSnap(res,runtime);
    return(
        <>
        {
            
                info.map((genres)=>(
                    <><button key={genres.id} className="tag">{genres.name}</button></>
                ))
            
        }
        <br></br><br></br>
        <h3>Release Date: {release_date} | Run Time: {runtime} min</h3>
        <br></br>
        </>
    );
}
export default Genres;