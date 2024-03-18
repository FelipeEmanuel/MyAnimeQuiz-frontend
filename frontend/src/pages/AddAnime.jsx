import { useEffect, useState } from "react";
import Header from "../components/Header";
import { get } from "../api";
import AddAnimes from "../components/AddAnimes";

function AddAnime(){

    
    return (
       <section className="container">
       <Header/>
       <AddAnimes></AddAnimes>
       </section>
    );
}

export default AddAnime