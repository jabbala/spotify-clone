import mongoose, { mongo } from "mongoose";

export const albumSchema = new mongoose.Schema({
    title:{type:String, required: true},
    artist:{type:String, required: true},
    imageUrl:{type:String, required: true},
    releaseYear:{type:Number, required: true},
    songs: [{type:mongose.Schema.Types.ObjectId, ref: "Song"}],
}, {timestamps: true});

const Album = mongoose.model("Album", albumSchema);

export default Album;