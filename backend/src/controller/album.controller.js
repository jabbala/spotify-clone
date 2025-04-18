

export const getAllAlbums = async (req, res, next) => {
    try {
        const albums = await Album.find();
        res.status(200).json({
            status: 'success',
            results: albums.length,
            data: {
                albums
            }
        });
    } catch (err) {
       next(err)
    }
}

export const getAlbumById = async (req, res, next) => {
    try {
        const albumId = req.params.albumId;
        const album = await Album.findById(albumId).populate('songs');
        if(!album){
            return res.status(404).json({
                status: 'fail',
                message: 'Album not found',
                data: null,
            });
        }
        res.status(200).json({
            status: 'success',
            data: {
                album
            }
        });
    } catch (err) {
        next(err)
    }
}