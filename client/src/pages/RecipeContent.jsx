import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Bu satırı genellikle ana componentinize eklemeniz daha iyi olur



const RecipeContent = () => {
  const [recipe, setRecipe] = useState(null);
  const { id } = useParams(); // URL'den ID'yi almak için useParams hook'unu kullanın
  const [isFavorited, setIsFavorited] = useState(false)//Dolu boş kalp yapan snippet
  

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
  const toggleFavorite = () => {
    setIsFavorited(!isFavorited); // Mevcut durumun tersini ayarla
    // Favori durumuna göre uygun toast mesajını göster
    if (!isFavorited) {
      toast.success("Deftere Eklendi!");
    } else {
      toast.error("Defterden Kaldırıldı!");
    }
  };

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



