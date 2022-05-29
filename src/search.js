import React, {useState,useEffect} from 'react';
import axios from './axios';
import "./search.css"
import Row from './Row';
import { Icon } from '@iconify/react';
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
const result="Results for ";
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
function Search()
{
  const user=useSelector(selectUser);
    const getSnap=async(genre)=>{
    await setDoc(doc(db,"users",user.email),{
        genres:{[genre]:increment(1)},
        isClick:increment(1)
    },{merge:true})};
    const[text,setText]=useState("");
    let inputhandler=(e)=>{
        var lowercase=e.target.value.toLowerCase();
        setText(lowercase);
        console.log(requests.fetchSearch+text);
        genres.map((genre)=>genre.active=false);
        window.scrollTo(0,0);
    }
    const[gen,setGen]=useState("");
    const[genname,setGenname]=useState("");
    let clickhandler=(genre)=>{
      
      if(genre.id!==0&&genre.name!=="clear")
      {
        if(genre.active===false)
        {
          setGen(gen+genre.id+",");
          setGenname(genname+genre.name+" ");
          getSnap(genre.id);
          genre.active=true;
        }
        else
        {
          setGen(gen.replace(genre.id+",",''));
          setGenname(genname.replace(genre.name,''));
          genre.active=false;
        }
      }
      else
      {
        setGen("");
        setGenname("");
        genres.map((genre)=>genre.active=false);
      }
      console.log(genname);
    }
    return (
      <div>
      <div className="rows">
      <div className="row__searchers">
      {
          genres.map((genre)=>(
              <button key={genre.id} className={!genre.active?"tagger":"tapper"} onClick={()=>clickhandler(genre)}>{genre.name}</button>
          ))
      }
      </div>
      <div>
      <Icon  className='big' icon="bi:arrow-right-circle" width="30" />
      </div>
      <div className='clear'>
      <button className="tag"  onClick={()=>clickhandler({id:0,name:"clear"})}>Clear</button>
      </div>
      <div className='searcher'>
      <input type="text" className="search" onChange={inputhandler} placeholder="Search Movies"></input>
      </div>
      </div>
      {gen?<Row title={result+genname} fetchUrl={requests.fetchSort+gen} isLargeRow={true}/>:""}
      {text?<Row title={result+text} fetchUrl={requests.fetchSearch+text} isLargeRow={true}/>:""}
      <br></br><br></br>
      </div>
    );
}
export default Search;