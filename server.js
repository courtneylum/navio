const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TravelModel = require("./model/Travel");
const callAzureApi = require("./azureOpenAi");

const app = express();
app.use(express.json());
app.use(cors());
mongoose.connect(process.env["MONGODB_URL"]);

const itinerarySchema = new mongoose.Schema({
    tripName: String,
    dateRange: String,
    days: Array
});

const Itinerary = mongoose.model('Itinerary', itinerarySchema);

app.get("/home", async (req, res) => {
    const itineraries = await Itinerary.find();
    res.json(itineraries);
})

app.post("/callAi", async (req, res) => {
    const {command} = req.body;
    const result = await callAzureApi(command);
    const newItinerary = new Itinerary(result);
    await newItinerary.save();
    res.json(newItinerary);
});

app.post("/login", (req, res) => {
    const {email, password} = req.body;
    TravelModel.findOne({email : email})
    .then(user => {
        if(user) {
            if(user.password === password){
                res.json("Success")
            }else{
                res.json("The password is incorrect")
            }
        } else{
            res.json("No record existed")
        }
    })
})

app.post("/register", (req, res) => {
    TravelModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})



app.listen(3001, () => {
    console.log("server is running")
})