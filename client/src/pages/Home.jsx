import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/recipe");
        setRecipes(response.data);
      } catch (error) {
        console.error("Tarifler yüklenirken bir hata oluştu!", error);
      }
    };

    fetchRecipes();
  }, []);

  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Tarif Listesi</h2>
      <input
        type="text"
        placeholder="Tarif ara..."
        className="mb-4 p-2 border rounded"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRecipes.map((recipe) => (
            <div key={recipe._id.$oid} className="border p-4 rounded-lg">
              <Link to={`/${recipe._id}`}>
                <h3 className="text-xl font-semibold mb-2">{recipe.name}</h3>
              </Link>
              <img
                src={recipe.picture}
                alt={recipe.name}
                className="mb-2 w-full h-auto"
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
          ))}
        </div>
      ) : (
        <p>Böyle bir yemek adı yok.</p>
      )}
    </div>
  );
};

export default Home;
