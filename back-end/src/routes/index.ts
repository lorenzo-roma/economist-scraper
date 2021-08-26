import express from 'express';
import articlesRoutes from "./articles";
import authRoutes from "./auth";

const router = express.Router();

router.use("/articles", articlesRoutes);
router.use("/auth", authRoutes)

export default router;