import React from "react";
import "./HomeScreen.css";
import Row from "../Row";
import requests from '../requests';
import Search from "../search";

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

  function Explorer()
  {
    return <div className="homeScreen">
    <Search/>
    {
        genres.map((genre)=>(
            <>
            <Row  title={genre.name} fetchUrl={requests.fetchGeneral+`&with_genres=${genre.id}`} isLargeRow={false}/>
            </>
        ))
    }
    </div>
}

export default Explorer;