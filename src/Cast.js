import React, {useState,useEffect} from "react";
import axios from './axios';
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
import "./row.css";
const base_url="https://image.tmdb.org/t/p/original/";
function Cast(movie_id)
{
    const user=useSelector(selectUser);
    const getSnap=async(whatever)=>{
    await setDoc(doc(db,"users",user.email),{
        casts:{[whatever]:increment(1)},
        isClick:increment(1)
    },{merge:true})};

    const getShot=async(whatever)=>{
        await setDoc(doc(db,"users",user.email),{
            crews:{[whatever]:increment(1)},
            isClick:increment(1)
        },{merge:true})};
    const[cast,setCast]=useState([]);
    const[crew,setCrew]=useState([]);
    async function fetchData(){
        const request=await axios.get("/movie/"+movie_id.movie_id+"/credits?api_key=d7f9c6e71e7e86cb66d0ce3838da986a");
        if(cast!==request.data.cast)
        {
            for(let i=0;i<Math.min(10,request.data.cast.length);i++)
            {
                setCast(cast=>[...cast,request.data.cast[i]]);
            }
        }
        if(crew!==request.data.crew)
        {
            for(let i=0;i<Math.min(10,request.data.crew.length);i++)
            {
                setCrew(crew=>[...crew,request.data.crew[i]]);
            }
        }
        return request;
    }
    useEffect(()=>{fetchData();},[movie_id.movie_id]);
    console.log(cast.length);
    console.log(crew.length);

    useEffect(()=>{cast.map((casts)=>(
        getSnap(casts.id)
      ))},[cast]);

      useEffect(()=>{crew.map((crews)=>(
        getShot(crews.id)
      ))},[crew]);

    return(
        <>
        <div className="row">
            <h2>Cast</h2>
            <div className="row__posters">
                {cast.map((casts)=>(
                        <div className="row__movie">
                        <div className="movie__image">
                            <img key={casts.id} className="row__poster" src={casts.profile_path?`${base_url}${casts.profile_path}`:"images/misc/profile_path.png"}alt=""/>
                            <div className="movie__name">
                                <center>
                                <button className='tag_movie'><center>{casts.name} as {casts.character}</center></button>
                                </center>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        <div className="row">
            <h2>Crew</h2>
            <div className="row__posters">
                {crew.map((casts)=>(
                        <div className="row__movie">
                        <div className="movie__image">
                            <img key={casts.id} className="row__poster" src={casts.profile_path?`${base_url}${casts.profile_path}`:"images/misc/profile_path.png"}alt=""/>
                            <div className="movie__name">
                                <center>
                                <button className='tag_movie'><center>{casts.job}</center><center>{casts.name}</center></button>
                                </center>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </>
       
    );
}
export default Cast;