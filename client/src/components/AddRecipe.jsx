import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment"; // Tarih ve saat formatlama için moment.js kütüphanesi

const AddComment = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [recipeId, setRecipeId] = useState("");
  const [comments, setComments] = useState([]); // Yorumları saklamak için state
  const token = currentUser.token; // currentUser objesinden alınıyor
  const user_username = currentUser.username;
  const user_profile_picture = currentUser.profilePicture;
  const [editingComment, setEditingComment] = useState(""); // Düzenlenen yorumun metni için
  const [editingCommentId, setEditingCommentId] = useState(null); // Düzenlenen yorumun ID'si için

  useEffect(() => {
    // Component yüklendiğinde yorum listesini çekme
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
      // Yorum listesinin başına yeni yorumu ekle
      const now = new Date();
      setComments((prevComments) => [
        {
          user_username: user_username,
          user_profile_picture: user_profile_picture,
          comment: comment,
          createdAt: now.toISOString(), // Oluşturulma tarihini ISO formatında ekle
        },
        ...prevComments,
      ]);
      setComment(""); // Yorum eklendikten sonra input alanını temizle
      setRecipeId(""); // Tarif ID alanını temizle
    } catch (error) {
      console.error("Yorum eklerken bir hata oluştu:", error);
      toast.error(
        `Yorum eklenirken bir sorun oluştu: ${
          error.response ? error.response.data.message : error.message
        }`
      );
    }
  };

  const handleDeleteComment = async (commentId) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    try {
      await axios.delete(
        `http://localhost:5000/api/comment/delete-comment/${commentId}`,
        config
      );

      toast.success("Yorum başarıyla silindi!");
      // Silinen yorumu yorum listesinden çıkar
      setComments((prevComments) =>
        prevComments.filter((comment) => comment._id !== commentId)
      );
    } catch (error) {
      console.error("Yorum silinirken bir hata oluştu:", error);
      toast.error(
        `Yorum silinirken bir sorun oluştu: ${
          error.response ? error.response.data.message : error.message
        }`
      );
    }
  };

  const startEditing = (commentId, currentComment) => {
    setEditingCommentId(commentId);
    setEditingComment(currentComment);
  };

const saveComment = async () => {
  // Yorum güncelleme isteği için gerekli bilgiler
  const requestBody = {
    commentId: editingCommentId,
    comment: editingComment,
  };

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  try {
    const response = await axios.put(
      "http://localhost:5000/api/comment/update-comment",
      requestBody,
      config
    );

    // Başarı bildirimi
    toast.success("Yorum başarıyla güncellendi!");

    // Yorum listesini güncelle
    setComments(
      comments.map((comment) => {
        if (comment._id === editingCommentId) {
          return { ...comment, comment: editingComment };
        }
        return comment;
      })
    );

    // Düzenleme durumunu temizle
    setEditingComment("");
    setEditingCommentId(null);
  } catch (error) {
    console.error("Yorum güncellenirken bir hata oluştu:", error);
    toast.error(
      `Yorum güncellenirken bir sorun oluştu: ${
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
        {comments.map((comment, index) => (
          <div key={index}>
            <img
              src={comment.user_profile_picture}
              alt="Profile"
              style={{ width: 50, height: 50, borderRadius: "50%" }}
            />
            <p>
              {comment.user_username}:{" "}
              {editingCommentId === comment._id ? (
                <input
                  type="text"
                  value={editingComment}
                  onChange={(e) => setEditingComment(e.target.value)}
                />
              ) : (
                comment.comment
              )}{" "}
              - {moment(comment.createdAt).format("YYYY-MM-DD HH:mm")}
            </p>
            {editingCommentId === comment._id ? (
              <button onClick={saveComment}>Kaydet</button>
            ) : (
              <>
                <button onClick={() => handleDeleteComment(comment._id)}>
                  Yorumu Sil
                </button>
                <button
                  onClick={() => startEditing(comment._id, comment.comment)}
                >
                  Yorumu Güncelle
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddComment;
