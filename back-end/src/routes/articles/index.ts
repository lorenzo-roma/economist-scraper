
import express from 'express';
import retrieveListHandler from "../../api/articles/retrieve-list";
import retrieveDetailHandler from "../../api/articles/retrieve-detail";
import JsonResponse from "../../middleware/json-response-middleware";
import CheckAuth from "../../middleware/check-auth-middleware";

const router = express.Router();

router.get("/", JsonResponse(retrieveListHandler));
router.post("/detail", CheckAuth, JsonResponse(retrieveDetailHandler), );

export default router;