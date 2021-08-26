
import express from 'express';
import performLogin from "../../api/auth/login";
import performSignup from "../../api/auth/signup";
import JsonResponse from "../../middleware/json-response-middleware";

const router = express.Router();

router.post("/login", JsonResponse(performLogin));
router.post("/signup", JsonResponse(performSignup));

export default router;