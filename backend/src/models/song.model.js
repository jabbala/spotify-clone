import mongoose from "mongoose";

export const songSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true,
    },
    audioUrl: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    albumId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Album',
        required: true,
    }
}, {
    timestamps: true,
});

const Song = mongoose.model('Song', songSchema);

export default Song;