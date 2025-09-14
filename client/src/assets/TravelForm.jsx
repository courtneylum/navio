import React, { useState } from "react";
import axios from 'axios';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import Stack from "@mui/material/Stack";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';


const TravelForm = ({setDisplay}) => {
    const [cities, setCities] = useState("");
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
   
    const validateUserCommand = () => {
        const command = `Please provide a detailed travel itinerary for the following destination(s) and dates: ${cities}, - ${startDate.toString()} to ${endDate.toString()}.`
        if (typeof command !== "string" || command.length > 2000) {
            throw new Error("Invalid input.");
        }
        // Simple domain guard: only travel planning queries allowed
        const forbidden = /\b(weapon|counterfeit|forgery|bypass|hack|sex|drugs|id|ssn|credit card)\b/i;
        if (forbidden.test(command)) {
            console.log(command);
            throw new Error("Request not allowed.");
        }
        createTrip(command.trim());
    };

    const createTrip = async (command) => {
        try {
            const response = await axios.post(`http://localhost:3001/callAi`,
                 { command: command });
            console.log(response);
            setDisplay(response.data.tripName);
            setCities('');
            setStartDate(null);
            setEndDate(null);
        } catch (error) {
            console.error(error);
        }
    };

    return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack spacing={2} direction="row" justifyContent="center">
        <TextField id="outlined-basic" label="City" variant="outlined" onChange={(e) => setCities(e.target.value)}/>
        <DatePicker label="Start Date" value={startDate} onChange={(date) => setStartDate(date)} />
        <DatePicker label="End Date" value={endDate} onChange={(date) => setEndDate(date)} />
        <Fab color="primary" aria-label="add">
            <AddIcon />
        </Fab>
        <Button variant="contained" onClick={ validateUserCommand }>Create Itinerary</Button>
        </Stack>
    </LocalizationProvider>
    );
};

export default TravelForm;