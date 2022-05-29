import React, { useEffect, useState } from "react";
import {db} from "./firebase";
import {doc,getDoc} from "firebase/firestore";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import axios from "axios";
import requests from "./requests";
const movie=requests.fetchMovie
const recommend=requests.fetchRecommendations;
const api=requests.fetchAPI;
const general=requests.fetchGeneral;
function Fetcher(data){
    const [movies,setMovies]=useState([]);
    const [details,setDetails]=useState([]);
    const[members,setMembers]=useState([]);
    async function fetchMembers(id)
    {
        const request=await axios.get(movie+id+"/credits"+api);
        setMembers(members=>[...members,{id:request.data.id,
            cast:request.data.cast,
            crew:request.data.crew}]);
    }
    async function fetchDetails(id)
    {
        const request=await axios.get(movie+id+api);
        setDetails(details=>[...details,{id:request.data.id,
            genres:request.data.genres,
            runtime:request.data.runtime,
            release_date:parseInt(request.data.release_date.slice(0,4),10),
            year:request.data.release_date
    }])
    }
    async function fetchData(id){
        const request=await axios.get(movie+id+recommend);
        request.data.results.map((result)=>{
            setMovies(movies=>[...movies,{id:result.id,
                title:(result.title||result.original_title),
                overview:result.overview,
                poster_path:result.poster_path,
                backdrop_path:result.backdrop_path,
                reference_id:id,
                type:"movie"
                }]);
            fetchDetails(result.id);
            fetchMembers(result.id);
            return request;
            })
            
    }
    async function fetchGenres(id){
        const request=await axios.get(general+`&with_genres=${id}`);
        request.data.results.map((result)=>{
            setMovies(movies=>[...movies,{id:result.id,
                title:(result.title||result.original_title),
                overview:result.overview,
                poster_path:result.poster_path,
                backdrop_path:result.backdrop_path,
                reference_genre_id:id,
                type:"genre"
                }]);
            fetchDetails(result.id);
            fetchMembers(result.id);
            return request;
            })
    }
    async function fetchTrend(){
        const request=await axios.get(requests.fetchTrending);
        request.data.results.map((result)=>{
            setMovies(movies=>[...movies,{id:result.id,
                title:(result.title||result.original_title),
                overview:result.overview,
                poster_path:result.poster_path,
                backdrop_path:result.backdrop_path,
                type:"genre"
                }]);
            fetchDetails(result.id);
            fetchMembers(result.id);
            return request;
            })
    }
    useEffect(()=>{
        if(data.data.movies)
        {
            Object.keys(data.data.movies).map((m)=>(
                fetchData(m)
            ))
        }
        else if(data.data.genres)
        {
            Object.keys(data.data.genres).map((m)=>(
                fetchGenres(m)
            ))
        }
        else
        {
            fetchTrend()
        }
    },[data.data])

    return ({movies,details,members});
}
export default Fetcher;
