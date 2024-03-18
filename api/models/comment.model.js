import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    recipe_id: {
      type: mongoose.Schema.Types.ObjectId, // Tarif ID'si, doğru bir ObjectId olmalı
      ref: "Recipe",
      required: true,
    },
    user_username: {
      type: String, // Kullanıcı adı artık bir string
      required: true,
    },
    user_profile_picture: {
      type: String, // Kullanıcı profil resmi URL'si de bir string
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
