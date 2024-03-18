import express from "express";
import {
  addComment,
  updateComment,
  deleteComment
} from "../controllers/comment.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

// Mevcut yorum ekleme route'u
router.post("/add-comment", verifyToken, addComment);

// Yorum güncelleme route'unu ekleyin
router.put("/update-comment", verifyToken, updateComment);

//Yorumu sil
router.delete("/delete-comment/:commentId", verifyToken, deleteComment);

export default router;
