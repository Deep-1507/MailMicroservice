import { Router } from "express";
import { sendMail } from "../main/mailer.js";
import { authMiddleware } from "../middlewares/authmiddleware.js";

const router = Router();

router.post("/sendmail", authMiddleware, sendMail);

export default router;
