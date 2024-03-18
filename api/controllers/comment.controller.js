import Comment from "../models/comment.model.js ";
import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";

// Yeni yorum ekleme fonksiyonu
export const addComment = async (req, res) => {
  const { recipe_id, comment } = req.body;

  // `verifyToken` middleware'inden gelen kullanıcı ID'si kullanılarak kullanıcıyı bul
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newComment = new Comment({
      recipe_id,
      user_username: user.username, // Kullanıcı modelinden username
      user_profile_picture: user.profilePicture, // Kullanıcı modelinden profil resmi
      comment,
    });

    const savedComment = await newComment.save();

    // Kaydedilen yorumu, kullanıcının kullanıcı adı ve profil resmiyle birlikte döndür
    res.status(201).json({
      id: savedComment.id,
      recipe_id: savedComment.recipe_id,
      user_username: user.username,
      user_profile_picture: user.profilePicture,
      comment: savedComment.comment,
      createdAt: savedComment.createdAt,
      updatedAt: savedComment.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};











