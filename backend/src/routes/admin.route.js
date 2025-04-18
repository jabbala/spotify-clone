import { Router } from "express";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";
import {
    createSong,
    deleteSong,
    updateSong,
    createAlbum,
    deleteAlbum,
    updateAlbum,
    checkAdmin,
} from "../controller/admin.controller.js";

const router = Router();

router.use(protectRoute, requireAdmin);

router.get("/check", checkAdmin);

router.post("/songs", createSong);
router.delete("/songs/:id", deleteSong);
router.put("/songs/:id", updateSong);

router.post("/albums", createAlbum);
router.delete("/albums/:id", deleteAlbum);
router.put("/albums/:id", updateAlbum);

export default router;