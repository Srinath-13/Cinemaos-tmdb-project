import React from "react";
import Fetcher from "./Fetcher";

function Assembler(data) {
    const movie = Fetcher(data);
    if (((movie.details.length === movie.members.length) && (movie.details.length === movie.movies.length) && (movie.movies.length === movie.members.length)) &&
        ((movie.details.length !== 0) && (movie.members.length !== 0) && (movie.movies.length !== 0))) {
        if (data.data.isClick !== 0 && data.data.isClick) {
            console.log(data.data.isClick);
            console.log(movie);
            var avg_runtime = Math.ceil(data.data.runtime / data.data.counter);
            var avg_year = Math.ceil(data.data.year / data.data.counter);
            for (let i = 0; i < movie.movies.length; i++) {
                movie.movies[i].score = 0
                if (movie.movies[i].type === "movie") {
                    movie.movies[i].score += (data.data.movies[movie.movies[i].reference_id]) * 100;
                    if (movie.movies[i].reference_id === data.data.recent) {
                        movie.movies[i].score += (data.data.movies[data.data.recent]) * 300;
                    }
                } else if (movie.movies[i].type === "genre") {
                    movie.movies[i].score += (data.data.genres[movie.movies[i].reference_genre_id]) * 100;
                }

            }
            for (let i = 0; i < movie.details.length; i++) {
                for (let j = 0; j < movie.details[i].genres.length; j++) {
                    if (data.data.genres[movie.details[i].genres[j].id]) {
                        movie.movies[i].score += (data.data.genres[movie.details[i].genres[j].id]) * 100;
                    }
                    movie.movies[i].score += (movie.details[i].runtime > avg_runtime ? avg_runtime - movie.details[i].runtime : movie.details[i].runtime - avg_runtime);
                    movie.movies[i].score += (movie.details[i].release_date > avg_year ? avg_year - movie.details[i].release_date : movie.details[i].release_date - avg_year);
                }
            }
            for (let i = 0; i < movie.members.length; i++) {
                if (data.data.casts) {
                    for (let j = 0; j < Math.min(10, movie.members[i].cast.length); j++) {
                        console.log(data.data.casts[movie.members[i].cast[j].cast_id]);
                        if (data.data.casts[movie.members[i].cast[j].cast_id]) {
                            movie.movies[i].score += (data.data.casts[movie.members[i].cast[j].id]) * 200;
                        }
                    }
                }
                if (data.data.crews) {
                    for (let k = 0; k < Math.min(10, movie.members[i].crew.length); k++) {
                        if (data.data.crews[movie.members[i].crew[k].crew_id]) {
                            movie.movies[i].score += (data.data.crews[movie.members[i].crew[k].id]) * 150;
                        }
                    }
                }
            }

            let n = movie.movies.length;
            for (let i = 0; i < n - 1; i++) {
                for (let j = i + 1; j < n; j++) {
                    if (movie.movies[j].score > movie.movies[i].score) {
                        [movie.movies[i], movie.movies[j]] = [movie.movies[j], movie.movies[i]];
                        [movie.details[i], movie.details[j]] = [movie.details[j], movie.details[i]];
                        [movie.members[i], movie.members[j]] = [movie.members[j], movie.members[i]];
                    }
                }
            }
            const mov = new Set();
            for (let i = 0; i < n; i++) {
                if (mov.has(movie.movies[i].id) || data.data.movies[movie.movies[i].id]) {
                    movie.movies[i].score = null;
                } else {
                    mov.add(movie.movies[i].id);
                }
                console.log(mov);
                movie.movies[i].details = "";
                movie.movies[i].members = "";
                movie.movies[i].details = movie.details[i];
                movie.movies[i].members = movie.members[i];
            }
            return (movie.movies);
        } else if (data.data.isClick === 0 || !data.data.isClick || !data.data) {
            let n = movie.movies.length;
            for (let i = 0; i < n; i++) {
                movie.movies[i].details = "";
                movie.movies[i].members = "";
                movie.movies[i].details = movie.details[i];
                movie.movies[i].members = movie.members[i];
            }
            return (movie.movies);
        }
    }
}
export default Assembler;