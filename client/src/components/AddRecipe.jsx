import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddComment = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [recipeId, setRecipeId] = useState("");
  const [comments, setComments] = useState([]); // Yorumları saklamak için yeni state
  const token = currentUser.token; // currentUser objesinden alınıyor
  const user_username = currentUser.username;
  const user_profile_picture = currentUser.profilePicture;

  useEffect(() => {
    // useEffect kullanarak yorum listesini çekme
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/comment/list-comment/65f6b284b1c14dd0189e49c4",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setComments(response.data); // Çekilen veriyi state'e ata
      } catch (error) {
        console.error("Yorum listesi çekilirken hata oluştu:", error);
        toast.error("Yorum listesi çekilirken bir hata oluştu.");
      }
    };

    fetchComments(); // Yorum listesini çekmek için fonksiyonu çağır
  }, [token]); // token değiştiğinde useEffect'i tetikle

  const handleAddComment = async () => {
    if (!comment.trim() || !recipeId.trim()) {
      toast.error("Tarif ID ve yorum boş bırakılamaz.");
      return;
    }

    const bodyParameters = {
      recipe_id: recipeId,
      comment: comment,
      username: user_username,
      profile_picture: user_profile_picture,
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
      setComment(""); // Yorumu başarıyla ekledikten sonra input'u temizle
      setRecipeId(""); // Tarif ID'yi temizle
      // Yorum eklendikten sonra yorum listesini güncelle
      fetchComments(); // Yorum listesini tekrar çek
    } catch (error) {
      console.error("Yorum eklerken bir hata oluştu:", error);
      toast.error(
        `Yorum eklenirken bir sorun oluştu: ${
          error.response ? error.response.data.message : error.message
        }`
      );
    }
  };

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
      <div>
        {comments.map((comment) => (
          <div
            key={comment._id}
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              marginBottom: "10px",
            }}
          >
            <img
              src={comment.user_profile_picture}
              alt="Profile"
              style={{ width: "50px", height: "50px", borderRadius: "50%" }}
            />
            <h4>{comment.user_username}</h4>
            <p>{comment.comment}</p>
            <span>{new Date(comment.createdAt).toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddComment;
