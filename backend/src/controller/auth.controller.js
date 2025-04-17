import User from "../models/user.model.js";

export const authCallback = async (req, res) => {
    try{
        const {id, firstname, lastname, imageUrl} = req.body;

        // check if user already exists
        const user = await User.findOne({clerkId: id});

        if(!user){
            //signup
            await User.create({
                clerkId: id,
                fullName: `${firstname} ${lastname}`,
                imageUrl,
            })
        }
        res.status(200).json({success:true})
    }
    catch(error){
        console.log("Error in clerk callback" + error)
        res.status(500).json({success:false, message:"Internal server error"});
    }
}