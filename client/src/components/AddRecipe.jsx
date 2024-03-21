import { useSelector } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddComment = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [recipeId, setRecipeId] = useState("");
  const token = currentUser.token; // currentUser objesinden alınıyor
  const user_username = currentUser.username;
  const user_profile_picture = currentUser.profilePicture;

  const handleAddComment = async () => {
    if (!comment.trim() || !recipeId.trim()) {
      toast.error("Tarif ID ve yorum boş bırakılamaz.");
      return;
    }

    const bodyParameters = {
      recipe_id: recipeId,
      comment: comment,
      username: user_username,
      profile_picture: user_profile_picture
    };

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      await axios.post(
        "http://localhost:5000/api/comment/add-comment",
        bodyParameters,
        config
      );
      
      toast.success("Yorum başarıyla eklendi!");
    } catch (error) {
      console.error("Yorum eklerken bir hata oluştu:", error);
      toast.error(
        `Yorum eklenirken bir sorun oluştu: ${
          error.response ? error.response.data.message : error.message
        }`
      );
    }
  };


/* console.log(user_profile_picture);
console.log(user_username)
console.log(token) */

  return (
    <div>
      <ToastContainer />
      <input
        type="text"
        placeholder="Tarif ID"
        value={recipeId}
        onChange={(e) => setRecipeId(e.target.value)}
      />
      <textarea
        placeholder="Yorumunuzu buraya yazınız..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button onClick={handleAddComment}>Yorum Ekle</button>
    </div>
  );
};

export default AddComment;
