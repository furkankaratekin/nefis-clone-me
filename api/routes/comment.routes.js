import express from "express";
import {
  addComment,
  editComment
} from "../controllers/comment.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

// Mevcut yorum ekleme route'u
router.post("/add-comment", verifyToken, addComment);
router.post("/edit", verifyToken, editComment);

// Yorum güncelleme route'unu ekleyin

export default router;
