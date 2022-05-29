import React, {useState,useEffect} from 'react';
import axios from './axios';
import requests from './requests';
import "./row.css";
import Cast from './Cast';
import { Icon } from '@iconify/react';
import Genres from './Genres';
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
const similar="Recommended Movies for ";
function Row({title,fetchUrl,isLargeRow,search})
{
  const user=useSelector(selectUser);
  const getSnap=async(genre)=>{
  await setDoc(doc(db,"users",user.email),{
      genres:{[genre]:increment(1)},
      isClick:increment(1)
  },{merge:true})};

  const getShot=async(movie)=>{
    await setDoc(doc(db,"users",user.email),{
        movies:{[movie]:increment(1)},
        isClick:increment(1),
        recent:movie
    },{merge:true})};

    const getRecent=async(movie)=>{
      await setDoc(doc(db,"users",user.email),{
          recent:movie
      },{merge:true})};
    
    const [movies,setMovies] = useState([]);
    useEffect(()=>{
        async function fetchData(){
            const request=await axios.get(fetchUrl);
            console.log(request);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    },[fetchUrl]);
      const [click,setClick]=useState(null);
      const handleClick = (movie) => {
          if(click===movie)
          {
            setClick(null);
          }
          else
          {
            setClick(movie);
            movie.genre_ids.map((genre)=>(
              getSnap(genre)
            ));
            console.log(movie.id);
            getShot(movie.id);
        }
      }
      const [credits,setCredits]=useState(null);
      const handleCredits=(movie)=>{
        if(credits===movie)
        {
          setCredits(null);
        }
        else
        {
          setCredits(movie);
          movie.genre_ids.map((genre)=>(
            getSnap(genre)
          ));
          getShot(movie.id);
        }
      }
      return (
      <>
      <div className="row">
          <div className='arrow'>
          <Icon icon="bi:arrow-right-circle" width="30" />
          </div>
          <h2>{title}</h2>
          <div key={title}>
            {movies!==null?<div className="row__posters">
              {movies.map((movie) => (
                <div className="row__movie">
                  <div className="movie__image">
                  <img key={movie.id} onClick={() => handleClick(movie)}
                    className="row__poster row__posterlarge" src={movie.poster_path?`${base_url}${movie.poster_path}`:"/images/misc/movie_poster_path.jpg"} alt={movie.title} />
                  </div>
                  <div className="movie__name">
                  <center>
                  <button className='tag_movie'><center>{movie.title||movie.name}</center></button>
                  </center>
                  </div>
                </div>
              ))}
            </div>:<div className='row__posters'><h1>No Results Found :(</h1></div>}
          </div>
        </div>
        
        {
          click?
          <>
          <div className="click__details">
            <div className='click__card'>
              <div className="click__image">
                  {(click.backdrop_path)?
                  <img key={click.id} className="click__image__style" src={`${base_url}${click.backdrop_path}`} alt={click.title} />
                  :<img key={click.id} className="click__image__style" src="/images/misc/backdrop_path.jpg" alt={click.title} />}
              </div>
              <div className="click__info">
              <div className='click__title'>
              <h1>{click.title||click.name}</h1>
            </div>
            {<Genres movie_id={click.id}/>}
                <h3>{click.overview}</h3>
                <br></br>
                <button className="tag" onClick={()=>{handleCredits(click)}}>Watched {click.title}?, Get the credits</button>
                <br></br><br></br><br></br>
              </div>
            </div>
          </div>
          </>
          :""
        }
        {
          (credits)?
          <Cast movie_id={credits.id}/>
          :""
        }
        {(click)?
        <>
        <div className='arrow'>
          <Icon icon="bi:arrow-right-circle" width="30" />
          </div>
        <Row title={similar + (click.title||click.name)} fetchUrl={requests.fetchMovie+click.id+requests.fetchRecommendations} isLargeRow={true}/></>:""}       
        </>
      );
}
export default Row;