import cloudinary from "../lib/cloudinary.js";
import Album from "../models/album.model.js";
import Song from "../models/song.model.js";


// helper function for cloudinary uploads
const uploadToCloudinary = async (file) => {
    try{
        const result = await cloudinary.uploader.upload(file.tempFilePath,{
            resource_type: "auto",
        })
        return result.secure_url
    }catch(error){
        console.log("Error in uploadToCloudinary", error);
        throw new Error("Error uploading file to cloudinary");
    }
}


export const createSong = async (req, res, next) => {
    try{
        if(!req.files || !req.files.audiofiles || !req.files.imageFile){
            return res.status(400).json({
                message:"Please upload all files",
            })
        }

        const {title, artist, albumId, duration} = req.body;
        const audioFile = req.files.audioFile;
        const imageFile = req.files.imageFile;

        const audioUrl = await uploadToCloudinary(audioFile);
        const imageUrl = await uploadToCloudinary(imageFile);

        const song = new Song({
            title,
            artist,
            audioUrl,
            imageUrl,
            albumId: albumId || null,
            duration,
        });

        await song.save();

        // if song belongs to any album, update the albums songs array
        if(albumId){
            await Album.findByIdAndUpdate(albumId, {
                $push: {songs: song._id},
            });
        }

        res.status(201).json({
            status: "success",
            message: "Song created successfully",
            data: {
                song
            },
        });

    } catch(error){
        console.log("Error in createSong" + error);
        next(error);
    }
}

export const deleteSong = async (req, res, next) => {
    try{
        const {id} = req.params;
        const song = await Song.findById(id);
        if(!song){
            return res.status(404).json({message:"Song not found"});
        }
        if(song.albumId){
            await Album.findByIdAndUpdate(song.albumId, {
                $pull: {songs: song._id},
            });
        }
        await Song.findByIdAndDelete(id);
        res.status(200).json({
            status:"success",
            message:"Song deleted successfully",
            data: {
                song,
            },
        });


    }catch(error){
        console.log("Error in deleteSong" + error);
        next(error);
    }
};

export const updateSong = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, artist, albumId, duration } = req.body;

        const song = await Song.findById(id);
        if (!song) {
            return res.status(404).json({ message: "Song not found" });
        }
        song.title = title || song.title;
        song.artist = artist || song.artist;

        if (albumId) {
            const album = await Album.findById(albumId);
            if (!album) {
                return res.status(404).json({ message: "Album not found" });
            }
            song.albumId = albumId;
        } else {
            song.albumId = null;
        }
        song.duration = duration || song.duration;

        await song.save();
        res.status(200).json({
            status: "success",
            message: "Song updated successfully",
            data: {
                song,
            },
        });
    } catch (error) {
        console.log("Error in updateSong", error);
        next(error);
    }
};

export const createAlbum = async (req, res, next) => {
    try{
        const {title, artist, releaseYear} = req.body;
        const imageFile = req.files.imageFile;
        const imageUrl = await uploadToCloudinary(imageFile);

        const album = new Album({
            title: title,
            artist: artist,
            imageUrl: imageUrl,
            releaseYear: releaseYear,
        });

        await album.save();
        res.status(201).json({
            status: "success",
            message: "Album created successfully",
            data: {
                album,
            },
        });

    }catch(error){
        console.log("Error in createAlbum", error);
        next(error);
    }

}

export const deleteAlbum = async (req, res, next) => {
    try{
        const {id} = req.params;
        const album = await Album.findById(id);
        if(!album){
            return res.status(404).json({message:"Album not found"});
        }
        await Song.deleteMany({albumId: id});
        await Album.findByIdAndDelete(id);
        res.status(200).json({
            status:"success",
            message:"Album deleted successfully",
            data: {
                album,
            },
        });
    }catch(error){
        console.log("Error in deleteAlbum", error);
        next(error);
    }
}

export const updateAlbum = async (req, res, next) => {
    try{
        const {id} = req.params;

        const {title, artist, releaseYear} = req.body;
        const imageFile = req.files.imageFile;

        const album = await Album.findById(id);

        if(!album){
            return res.status(404).json({message:"Album not found"});
        }

        album.title = title || album.title;
        album.artist = artist || album.artist;
        album.releaseYear = releaseYear || album.releaseYear;

        if(imageFile){
            const imageUrl = await uploadToCloudinary(imageFile);
            album.imageUrl = imageUrl;
        }

        await album.save();
        res.status(200).json({
            status:"success",
            message:"Album updated successfully",
            data: {
                album,
            },
        });
    }catch(error){
        console.log("Error in updateAlbum", error);
        next(error);
    }
}

export const checkAdmin = async (req, res, next) => {
	res.status(200).json({
        status: "success",
        message: "You are an admin",
        data: {
            admin: true,
        },
    });
};