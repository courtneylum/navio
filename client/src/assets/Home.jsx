import React, { useState, useEffect } from "react";
import axios from 'axios';
import TravelForm from "./TravelForm"
import Button from '@mui/material/Button';

const Home = () => {
    const [itineraries, setItineraries] = useState([]);
    const [display, setDisplay] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:3001/home`)
            .then(response => setItineraries(response.data))
            .catch(error => console.log(error));
    }, []);

    return(
        <center>
            <TravelForm setDisplay={setDisplay}/>
            <h1>Trips</h1>
            <ul>
                {itineraries.map((itinerary) => (
                    <li className="bg-[#fff] p-5 m-5 rounded-[5px] shadow-md" key={itinerary._id}>
                        <h3 className="font-bold text-lg">{itinerary.tripName}</h3>
                        <p>{itinerary.dateRange}</p>
                        <div>
                            <ul>
  {itineraries.flatMap((itinerary) =>
    (itinerary?.days ?? []).flatMap((day, di) =>
      (day?.timeline ?? []).flatMap((slot, si) =>
        (slot?.activities ?? []).map((activity, ai) => (
          <li key={`${itinerary._id}-${di}-${si}-${ai}`}>
            <strong>{itinerary.tripName}</strong> — Day {day.day_number} ({day.date}) — {slot.time}: {activity}
          </li>
        ))
      )
    )
  )}
</ul>
                        </div>
                    </li>
                ))}
            </ul>
                <h3>{display}</h3>
        </center>
    )
}

export default Home;