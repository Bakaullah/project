const express = require('express');
const mongoose  = require('mongoose');

const menSchema = new mongoose.Schema({
    ranking: {
        type: Number,
        required: true,
        unique:true
    },
    name: {
        type: String,
        required: true,
        trim:true
    },
    dob: {
        type: Date,
        required: true,
        trim:true
    },
    country :{
        type: String,
        required: true,
        trim:true
    },
    score :{
        type: String,
        required: true,
        trim:true
    },
    events :{
        type: String,
        default:"100m",
    }

})

const MensRanking = new mongoose.model("MenRanking",menSchema);

module.exports = MensRanking;