import React from "react";
import Assembler from "./Assembler";
import Display from "./Display";
import "./Recommender.css";
import Nav from "./Nav";
function Recommender(data)
{
    const movie=Assembler(data);
    if(movie)
    {
        console.log(movie);
        
        return(
            <Display data={movie}/>
        );
    }
    else
    {
        return(
            <>
            <Nav/>
            <div id="loader"></div>
            </>
        )
    }
}
export default Recommender;