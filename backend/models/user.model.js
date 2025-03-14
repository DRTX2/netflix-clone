import mongoose from "mongoose";

const {Schema}=mongoose;

const userSchema=Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true, //every cahracter will be in lower case
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:String,
        default:""
    },
    searchHistory: {
        type: [
          {
            id: Number,
            image: String,
            title: String,
            searchType: String,
            createdAt: Date,
          }
        ],
        default: []
      }
    
}, {timestamps:true});// to create automatically the createdAt and updatedAt properties

export const User=mongoose.model("User",userSchema);