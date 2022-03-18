import mongoose from 'mongoose';

const Location = new mongoose.Schema({
    latitude: {type: Number, default: 0.0},
    longitude: {type: Number, default: 0.0},
}, {})

export default Location;



