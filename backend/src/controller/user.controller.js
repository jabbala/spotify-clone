
export const getAllUsers = async (req, res, next) => {
    try {
        const currentUserId = req.auth.userId;
        const users = await User.find({clerkId: {$ne: currentUserId}});

        res.status(200).json({
            status: 'success',
            result: users.length,
            data: {
                users
            }
        });
    }catch(error){
        next(error);
    }
}