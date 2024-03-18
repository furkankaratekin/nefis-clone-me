import React, { useState, useEffect } from "react";
import axios from "axios";

const RecipeContent = () => {
  const [recipe, setRecipe] = useState(null);
  const recipeId = "65f6b284b1c14dd0189e49c1"; // Bu örnek için sabit bir ID kullanılmıştır.

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/recipe/${recipeId}`
        );
        setRecipe(response.data);
      } catch (error) {
        console.error("Tarif yüklenirken bir hata oluştu", error);
      }
    };

    fetchRecipe();
  }, [recipeId]); // recipeId değişkeni değiştiğinde useEffect hook'u tekrar çalışır.

  return (
    <div>
      {recipe ? (
        <div className="border p-4 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-2">{recipe.name}</h2>
          <img
            src={recipe.picture}
            alt={recipe.name}
            className="w-full h-auto mb-4"
          />
          <p>
            <strong>Kategori:</strong> {recipe.category}
          </p>
          <p>
            <strong>Malzemeler:</strong>
          </p>
          <ul className="list-disc list-inside">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <p>
            <strong>Tarif:</strong> {recipe.recipe}
          </p>
          <p>
            <strong>Kalori:</strong> {recipe.calorie}
          </p>
          {recipe.content_photos &&
            recipe.content_photos.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`İçerik fotoğrafı ${index}`}
                className="w-full h-auto my-2"
              />
            ))}
        </div>
      ) : (
        <p>Tarif yükleniyor...</p>
      )}
    </div>
  );
};

export default RecipeContent;
