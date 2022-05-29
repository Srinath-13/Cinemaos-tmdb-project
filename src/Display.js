import React, { useState } from "react";
import "./Display.css";
import { Icon } from '@iconify/react';
import Row from "./Row";
import axios from './axios';
import requests from './requests';
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
const base_url="https://image.tmdb.org/t/p/original/";
function Display(data)
{
  const user=useSelector(selectUser);

  const getSnap=async(genre)=>{
  await setDoc(doc(db,"users",user.email),{
      genres:{[genre]:increment(1)},
      isClick:increment(1)
  },{merge:true})};

  const getShot=async(movie)=>{
    await setDoc(doc(db,"users",user.email),{
        movies:{[movie.id]:increment(1)},
        isClick:increment(1),
        recent:movie.id,
        runtime:increment(movie.details.runtime),
        year:increment(movie.details.release_date)
    },{merge:true})};

    const getSnapper=async(whatever)=>{
        await setDoc(doc(db,"users",user.email),{
            casts:{[whatever]:increment(1)},
            isClick:increment(1)
        },{merge:true})};
    
        const getShotter=async(whatever)=>{
            await setDoc(doc(db,"users",user.email),{
                crews:{[whatever]:increment(1)},
                isClick:increment(1)
            },{merge:true})};
    
    const [click,setClick]=useState(null);
      const handleClick = (movie) => {
          if(click===movie)
          {
            setClick(null);
          }
          else
          {
            setClick(movie);
            movie.details.genres.map((genre)=>(
              getSnap(genre.id)
            ));
            getShot(movie);
            }
        console.log(click);
      }
      const [credits,setCredits]=useState(null);
      const handleCredits=(movie)=>{
        if(credits===click)
        {
          setCredits(null);
        }
        else
        {
          setCredits(movie);
          movie.details.genres.map((genre)=>(
            getSnap(genre.id)
          ));
          getShot(movie);
          for(let i=0;i<Math.min(10,movie.members.cast.length);i++)
          {
              getSnapper(movie.members.cast[i].id);
          }
          for(let i=0;i<Math.min(10,movie.members.crew.length);i++)
          {
              getShotter(movie.members.crew[i].id);
          }
        }
        console.log(credits);
      }
    return(
        <>
        <div className="mar">
            <h2>Directed For You with love from Cinemaos</h2>
            <div>
                <div className="row__cards">
                    {
                        data.data.map((movie)=>(
                            movie.score!==null?
                            <>
                            <div className="row__movie">
                                <div className="movie__image">
                                <img key={movie.id} className="row__poster row__posterlarge" onClick={() => handleClick(movie)}
                                src={movie.poster_path?`${base_url}${movie.poster_path}`:"/images/misc/movie_poster_path.jpg"} alt={movie.title} />
                                </div>
                                <div className="movie__name">
                                <center>
                                <button className='tag_movie'><center>{movie.title}</center></button>
                                </center>
                                </div>
                                <div>
                            </div>
                            </div>
                            {
                                click===movie?
                                <div key={movie.id}>
                                <div className="click__details">
                                    <div className="click__card">
                                        <div className="click__image">
                                                {(click.backdrop_path)?
                                                <img key={click.id} className="click__image__style" src={`${base_url}${click.backdrop_path}`} alt={click.title} />
                                                :<img key={click.id} className="click__image__style" src="/images/misc/backdrop_path.jpg" alt={click.title} />}
                                        </div>
                                        <div className="click__info">
                                            <div className='click__title'>
                                                <h1>{click.title}</h1>
                                            </div>
                                            <>
                                            {
                                
                                                click.details.genres.map((genre)=>(
                                                    <><button key={genre.id} className="tag">{genre.name}</button></>
                                                ))
                                            }
                                            <br></br><br></br>
                                            <h3>Release Date: {click.details.year} | Run Time: {click.details.runtime} min</h3>
                                            <br></br>
                                            </>
                                            <h3>{click.overview}</h3>
                                            <br></br>
                                            <button className="tag" onClick={()=>{handleCredits(click)}}>Watched {click.title}?, Get the credits</button>
                                            <br></br><br></br><br></br>
                                        </div>
                                    </div>
                                </div>
                                </div>
                                :""
                            }
                            {
                                (credits===movie && click===movie)?
                                <div className="casts">
                                <div className="row">
                                    <h2>Cast</h2>
                                    <div className="row__posters">
                                        {credits.members.cast.map((casts)=>(
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
                                        {credits.members.crew.map((casts)=>(
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
                                </div>
                                :""
                            }   
                            </>
                            :""
                        ))
                    }
                </div>
            </div>
        </div>
        
        </>
    );
}
export default Display;