const mongoose = require('mongoose')

const donationSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        maxlength:32,
        tirm: true
    },
    phoneNumber:{
        type: Number,
        required: true,
        maxlength: 15,
        tirm: true
    },

    address:{
        type: String,
        trim: true,
        maxlength:70,
        required: true
    },
    bloodGroup:{
        type: String,
        trim: true,
        required: true
    },
    photo: {
        type: String
    }


},{timestamps:true})


module.exports = mongoose.model('DONATION', donationSchema)