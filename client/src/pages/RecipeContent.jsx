import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Bu satırı genellikle ana componentinize eklemeniz daha iyi olur

const RecipeContent = () => {
  const [recipe, setRecipe] = useState(null);
  const { id } = useParams(); // URL'den ID'yi almak için useParams hook'unu kullanın
  const [isFavorited, setIsFavorited] = useState(false); //Dolu boş kalp yapan snippet
  const { currentUser} = useSelector((state) => state.user);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/recipe/${id}`
        );
        setRecipe(response.data);
      } catch (error) {
        console.error("Tarif detayları yüklenirken bir hata oluştu!", error);
      }
    };

    fetchRecipeDetails();
  }, [id]); // ID değiştiğinde useEffect'i tekrar çalıştır

  if (!recipe) {
    return <p>Yükleniyor...</p>;
  }

  //Kalp ikonuna tıklamada değişme
const toggleFavorite = async () => {
  // Mevcut favori durumunu değiştir
  setIsFavorited(!isFavorited);

  if (!isFavorited) {
    // Favorilere ekleme işlemi
    try {
      // API URL'i, kullanıcının ID'si ile birlikte dinamik olarak oluşturuluyor
      const apiUrl = `http://localhost:5000/api/recipe/favorites/${currentUser._id}/add`;

      // Axios POST isteği için gönderilecek olan veri
      const postData = {
        recipeId: recipe._id, // recipe._id değerini göndermek için kullanılıyor
      };
      // Axios ile POST isteği yapılıyor ve veri gönderiliyor
   await axios
       .post(apiUrl, postData, {
         headers: {
           Authorization: `Bearer ${currentUser.token}`, // Bearer eklenmiş olabilir
           Accept: "application/json",
           "Content-Type": "application/json",
         },
       })
      // Başarılı toast mesajı
      toast.success("Deftere Eklendi!");
    } catch (error) {
      // Hata durumunda konsola ve kullanıcıya hata mesajı yazdırılıyor
      console.error("Favorilere ekleme hatası:", error);
      toast.error("Favorilere ekleme işlemi başarısız oldu.");
      // Ekleme işlemi başarısız olursa, favori durumu eski haline getiriliyor
      setIsFavorited(!isFavorited);
    }
  } else {
    // Favorilerden çıkarma işlemi için şimdilik bir işlem yapılmıyor
    // Not: Bu kısım gelecekte doldurulacak
    toast.error("Defterden Kaldırıldı!");
  }
};



  console.log(currentUser._id);
  console.log(recipe._id);
  console.log(currentUser.token);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{recipe.name}</h2>
      <img
        src={recipe.picture}
        alt={recipe.name}
        className="mb-4 w-full h-auto"
      />
      <p className="mb-2">
        <strong>Kategori:</strong> {recipe.category}
      </p>
      <ul className="mb-2 list-disc list-inside">
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <p className="mb-2">
        <strong>Tarif:</strong> {recipe.recipe}
      </p>
      <div onClick={toggleFavorite} style={{ cursor: "pointer" }}>
        {isFavorited ? (
          <FaHeart size="2em" color="red" />
        ) : (
          <FaRegHeart size="2em" />
        )}
      </div>
      {/* Toast mesajlarını göstermek için ToastContainer eklenir */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <div className="flex gap-2 mb-2">
        {recipe.content_photos.map((photo, index) => (
          <img
            key={index}
            src={photo}
            alt={`İçerik fotoğrafı ${index + 1}`}
            className="w-1/3 h-auto"
          />
        ))}
      </div>
      <p className="mb-2">
        <strong>Kalori:</strong> {recipe.calorie}
      </p>
    </div>
  );
};

export default RecipeContent;
